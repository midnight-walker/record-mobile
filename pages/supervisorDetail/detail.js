// pages/supervisorDetail/detail.js
let { promiseRequest } = require('../../utils/util.js');
const moment = require('../../utils/moment.js');
const imgUploader = require('../../utils/uploadImage');
var app = getApp();
let defaultDetail=()=>{
  return {
    recordTypeId: 0,
    quantity: 1,
    picture:'',
    longitude:'',
    latitude:'',
    description:'',
    projectId:'',
    supervisorId:'',
    status:1,
    reason:''
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    projectIndex: 0,
    supervisorIndex: 0,
    projectList: [],
    supervisorList: [],
    supervisorSearchList: [],
    projectId: '',
    supervisorId: '',
    selectSupervisor:{},
    showPage: 1,
    savedDetail:[],
    recordTypeList:[],
    recordTypeCate1:[],
    recordTypeCate2:[],
    recordTypeSearchCate2:[],
    cate1Index:0,
    cate2Index:0,
    currDetail: defaultDetail(),
    supervisorDetailList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo(userInfo=> {
      //更新数据
      this.setData({
        userInfo: userInfo
      })
    });
    try{
      let projectList = wx.getStorageSync('projectList') || [],
        supervisorList = wx.getStorageSync('supervisorList') || [];
      this.setData({
        projectList,
        supervisorList
      })

      let recordTypeList = wx.getStorageSync('recordTypeList'),
        recordTypeCate1 = wx.getStorageSync('recordTypeCate1'),
        recordTypeCate2 = wx.getStorageSync('recordTypeCate2'),
        supervisorDetailList = wx.getStorageSync('supervisorDetailList') || [];
      this.setData({
        recordTypeList,
        recordTypeCate1,
        recordTypeCate2,
        supervisorDetailList,
      })
    }catch(e){
      wx.showModal({
        content: e.toString(),
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  /*projectChange(e){
    let value = parseInt(e.detail.value),
    projectId = this.data.projectList[value].id,
    supervisorSearchList = this.data.supervisorList.filter(item => item.projectId === projectId),
    supervisorId = supervisorSearchList[0].id;
    this.setData({
      projectIndex: value,
      projectId,
      supervisorSearchList,
      supervisorId,
      supervisorIndex: 0
    })
  },
  supervisorChange(e) {
    let value = parseInt(e.detail.value);
    this.setData({
      supervisorIndex: value,
      supervisorId: this.data.supervisorSearchList[value].id
    })
  },*/
  switchPage:function(e){
    let showPage=parseInt(e.target.dataset.id);
    this.setData({
      showPage
    })
  },
  chooseImage: function () {
    const self = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: (res) =>{
        this.setData({
          'currDetail.picture': res.tempFilePaths[0]
        });
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  deleteImage: function (e) {
    this.setData({
      'currDetail.picture':''
    });
  },
  noneLocation:function(e){
    this.setData({
      'currDetail.latitude': 0,
      'currDetail.longitude': 0
    });
  },
  getLocation: function (e) {
    wx.showLoading({ title: '获取定位中' });
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res);
        this.setData({
          'currDetail.latitude': res.latitude,
          'currDetail.longitude': res.longitude
        });
      },
      fail:()=>{
        this.setData({
          'currDetail.latitude': 0,
          'currDetail.longitude': 0
        });
        wx.showModal({
          content: '获取定位失败！',
          showCancel: false
        })
      },
      complete: () => {
        wx.hideLoading();
      }
    });
  },
  recordTypeCate1Change(e){
    let cate1 = this.data.recordTypeCate1[e.detail.value],
      recordTypeSearchCate2=this.data.recordTypeCate2.filter(item=>item.pid===cate1.id);
    this.setData({
      cate1Index: parseInt(e.detail.value),
      recordTypeSearchCate2,
      cate2Index: 0
    })
  },
  recordTypeCate2Change(e) {
    this.setData({
      cate2Index: parseInt(e.detail.value)
    })
  },
  setDescription(e){
    this.setData({
      'currDetail.description':e.detail.value
    })
  },
  setQuantity(e){
    this.setData({
      'currDetail.quantity': e.detail.value
    })
  },
  deleteSupervisorItem(e){
    wx.showModal({
      title: '提示',
      content: '确定要删除这条记录？删除后无法恢复',
      success: (res) =>{
        if (res.confirm) {
          let index = e.target.dataset.index, supervisorDetailList = this.data.supervisorDetailList;
          supervisorDetailList.splice(index, 1);
          wx.setStorageSync('supervisorDetailList', supervisorDetailList);
          this.setData({
            supervisorDetailList
          })
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
        }
      }
    })
    
  },
  viewMap(){
    let { latitude, longitude}=this.data.currDetail;
    if (latitude && longitude){
      wx.openLocation({
        address:"说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明说明",
        latitude,
        longitude,
      })
    }else{
      wx.showModal({
        content: '未定位，无法查看当前位置的地图',
        showCancel: false
      })
    }
  },
  checkSaveData(){
    return new Promise((resolve,reject)=>{
      let recordTypeId = 0,recordTypeName='正常', submitData = Object.assign({}, this.data.currDetail);
      if (this.data.cate1Index) {
        let recordType = this.data.recordTypeSearchCate2[this.data.cate2Index];
        recordTypeId = recordType.id;
        recordTypeName = recordType.name;
      }
      if (!submitData.projectId || !submitData.supervisorId) {
        reject('请先选输入监理点编号并查询！');
      }
      if (submitData.picture === "") {
        reject('请先选择照片！');
      }
      if (submitData.longitude === "" && submitData.latitude === "") {
        reject('请先定位！');
      }
      if (submitData.longitude === 0 && submitData.latitude === 0 && submitData.description === '' && recordTypeId !== 0) {
        reject('当前定位不成功，请填写问题描述！');
        
        return;
      }
      if (isNaN(submitData.quantity)) {
        reject('数量必须是数字！');
      }
      submitData.recordTypeId = recordTypeId;
      submitData.recordTypeName = recordTypeName;
      submitData.timeStamp = +new Date();
      submitData.timeStr = moment(submitData.timeStamp, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
      submitData.projectName = this.data.projectList.find(item => item.id === submitData.projectId).name;
      submitData.supervisorName = this.data.supervisorList.find(item => item.id === submitData.supervisorId).placeName;
      resolve(submitData);
    })
  },
  save(){
    wx.showLoading({ title: '保存中' });
    setTimeout(()=>{
      this.checkSaveData().then(res=>{
        let supervisorDetailList = this.data.supervisorDetailList
        supervisorDetailList.unshift(res);
        wx.setStorageSync('supervisorDetailList', supervisorDetailList);
        this.setData({
          supervisorDetailList,
          currDetail: defaultDetail()
        })
        wx.hideLoading();
        wx.showModal({
          content: '保存成功！',
          showCancel: false
        })
        
      }).catch(e=>{
        e=typeof e==='string'?e:e.toString()
        wx.hideLoading();
        wx.showModal({
          content: e,
          showCancel: false
        })
      })
    },100)
  },
  uploadItem(item, supervisorDetailList){
    imgUploader([item.picture]).then(pics => {
      let { supervisorId, recordTypeId, longitude, latitude, description, quantity, status,reason}=item;
      promiseRequest('/api/supervisorDetail',{
        picture: pics[0],
        supervisorId,
        recordTypeId, 
        longitude, 
        latitude, 
        description, 
        quantity, 
        status, 
        reason,
        operator: this.data.userInfo.nickName
      },"POST").then(res=>{
        if(res.success){
          supervisorDetailList.pop();
          wx.setStorageSync('supervisorDetailList', supervisorDetailList);
          this.setData({
            supervisorDetailList
          });
          this.uploadList();
        }else{
          throw new Error(res.message);
        }
      })
    }).catch(e => {
      wx.showModal({
        content: e.toString(),
        showCancel: false
      })
    })
  },
  uploadList(){
    let list = this.data.supervisorDetailList;
    if (list.length>0){
      this.uploadItem(list[list.length-1], list);
    }else{
      wx.hideLoading();
      wx.showModal({
        content: '上传完成！',
        showCancel: false
      })
    }
  },
  upload(){
    wx.showLoading({ title: '上传中' });
    this.uploadList();
  },
  getSupervisor(e){
    console.log(this.data.supervisorList,parseInt(e.detail.value));
    let supervisor = this.data.supervisorList.find(item => item.id === parseInt(e.detail.value));
    if(!supervisor){
      wx.showModal({
        content: '未找到指定编号的监理点！',
        showCancel: false
      })
      this.setData({
        'currDetail.supervisorId': '',
        'currDetail.projectId': '',
        selectSupervisor: {}
      })
    }else{
      this.setData({
        'currDetail.supervisorId': supervisor.id,
        'currDetail.projectId':supervisor.projectId,
         selectSupervisor:{...supervisor}
      })
    }
  }
})