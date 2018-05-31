// pages/monitorDetail/detail.js
let { promiseRequest } = require('../../utils/util.js');
const moment = require('../../utils/moment.js');
const imgUploader = require('../../utils/uploadImage');
var app = getApp();
let defaultDetail = () => {
  return {
    signNumber: '',
    picture: '',
    longitude: '',
    latitude: '',
    altitude:'',
    description: '',
    slopePosition: '',
    slopeDirection: '',
    treeHeight: '',
    treeRadius: '',
    projectId: '',
    monitorId: '',
    status:0
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    showPage:1,
    monitorList:[],
    monitorDetailList:[],
    selectMonitor:{},
    currDetail: defaultDetail(),
    files:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo(userInfo => {
      //更新数据
      this.setData({
        userInfo: userInfo
      })
    });
    try {
      let projectList = wx.getStorageSync('projectList') || [],
        monitorList = wx.getStorageSync('monitorList') || [], 
        monitorDetailList = wx.getStorageSync('monitorDetailList') || [];
      this.setData({
        projectList,
        monitorList,
        monitorDetailList
      });
    } catch (e) {
      wx.showModal({
        content: e.toString(),
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  switchPage: function (e) {
    let showPage = parseInt(e.target.dataset.id);
    this.setData({
      showPage
    })
  },
  getMonitor(e){
    let monitor = this.data.monitorList.find(item => item.id === parseInt(e.detail.value));
    if (!monitor) {
      wx.showModal({
        content: '未找到指定编号的监测点！',
        showCancel: false
      })
      this.setData({
        'currDetail.monitorId': '',
        'currDetail.projectId': '',
        selectMonitor: {}
      })
    } else {
      this.setData({
        'currDetail.monitorId': monitor.id,
        'currDetail.projectId': monitor.projectId,
        selectMonitor: { ...monitor }
      })
    }
  },
  chooseImage(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: res.tempFilePaths
        });
      }
    })
  },
  previewImage(e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  getLocation(e) {
    wx.showLoading({ title: '获取定位中' });
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res);
        this.setData({
          'currDetail.latitude': res.latitude,
          'currDetail.longitude': res.longitude,
          'currDetail.altitude': res.altitude
        });
      },
      fail: () => {
        this.setData({
          'currDetail.latitude': 0,
          'currDetail.longitude': 0,
          'currDetail.altitude': 0
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
  checkSaveData() {
    return new Promise((resolve, reject) => {
      let submitData = Object.assign({}, this.data.currDetail)
      if (!submitData.projectId || !submitData.monitorId) {
        reject('请先选输入监测点编号并查询！');
      }
      if (!this.data.files.length) {
        reject('请先选择照片！');
      }else{
        submitData.picture = this.data.files[0];
      }
      if (isNaN(submitData.longitude) || isNaN(submitData.latitude) || isNaN(submitData.latitude)) {
        reject('请输入正确的定位信息！');
      }
      if (!submitData.signNumber || isNaN(submitData.signNumber)) {
        reject('请填写正确的人工编号！');
      }
      if (!submitData.slopePosition) {
        reject('请填写坡位！');
      }
      if (!submitData.slopeDirection) {
        reject('请填写坡向！');
      }
      if (!submitData.treeHeight || isNaN(submitData.treeHeight)) {
        reject('请填写正确的树高！');
      }
      if (!submitData.treeRadius || isNaN(submitData.treeRadius)) {
        reject('请填写正确的树径！');
      }
      submitData.savedAt = +new Date();
      submitData.timeStr = moment(submitData.savedAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
      submitData.projectName = this.data.projectList.find(item => item.id === submitData.projectId).name;
      submitData.monitorName = this.data.monitorList.find(item => item.id === submitData.monitorId).placeName;
      resolve(submitData);
    })
  },
  saveMonitor(){
    wx.showLoading({ title: '保存中' });
    setTimeout(() => {
      this.checkSaveData().then(res => {
        console.log(res);
        let monitorDetailList = this.data.monitorDetailList
        monitorDetailList.unshift(res);
        wx.setStorageSync('monitorDetailList', monitorDetailList);
        let detail = this.data.currDetail,
          projectId = detail.projectId,
          monitorId = detail.monitorId,
          currDetail = defaultDetail();
        currDetail.projectId = projectId;
        currDetail.monitorId = monitorId;
        this.setData({
          monitorDetailList,
          currDetail,
          selectedTypes: []
        })
        wx.hideLoading();
        wx.showModal({
          content: '保存成功！',
          showCancel: false
        })
      }).catch(e => {
        e = typeof e === 'string' ? e : e.toString()
        wx.hideLoading();
        wx.showModal({
          content: e,
          showCancel: false
        })
      })
    }, 100)
  },
  uploadItem(item, monitorDetailList) {
    imgUploader([item.picture], "monitor/"+item.monitorId).then(pics => {
      let { projectId, monitorId, longitude, latitude, altitude, signNumber, slopePosition, slopeDirection, treeHeight, treeRadius, description, savedAt } = item;
      promiseRequest('/api/monitorDetail', {
        picture: pics[0],
        projectId, 
        monitorId, 
        longitude, 
        latitude, 
        altitude, 
        signNumber, 
        slopePosition, 
        slopeDirection, 
        treeHeight, 
        treeRadius, 
        description, 
        savedAt
      }, "POST").then(res => {
        if (res.success) {
          monitorDetailList.pop();
          wx.setStorageSync('monitorDetailList', monitorDetailList);
          this.setData({
            monitorDetailList
          });
          this.uploadList();
        } else {
          throw new Error(res.message);
        }
      }).catch(e => {
        throw new Error(e);
      })
    }).catch(e => {
      wx.showModal({
        content: e.toString(),
        showCancel: false
      })
    })
  },
  uploadList() {
    let list = this.data.monitorDetailList;
    if (list.length > 0) {
      this.uploadItem(list[list.length - 1], list);
    } else {
      wx.hideLoading();
      wx.showModal({
        content: '上传完成！',
        showCancel: false
      })
    }
  },
  upload() {
    wx.showLoading({ title: '上传中' });
    this.uploadList();
  },
  deleteMonitorItem(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这条记录？删除后无法恢复',
      success: (res) => {
        if (res.confirm) {
          let index = e.target.dataset.index, monitorDetailList = this.data.monitorDetailList;
          wx.removeSavedFile({
            filePath: monitorDetailList[index].picture,
            complete: function (res) {
              console.log(res)
            }
          })
          monitorDetailList.splice(index, 1);
          wx.setStorageSync('monitorDetailList', monitorDetailList);
          this.setData({
            monitorDetailList
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
  /*

  事件绑定

  */
  signNumberInput(e){
    this.setData({
      'currDetail.signNumber': e.detail.value
    })
  },
  longitudeInput(e) {
    this.setData({
      'currDetail.longitude': e.detail.value
    })
  },
  latitudeInput(e) {
    this.setData({
      'currDetail.latitude': e.detail.value
    })
  },
  altitudeInput(e) {
    this.setData({
      'currDetail.altitude': e.detail.value
    })
  },
  slopePositionInput(e) {
    this.setData({
      'currDetail.slopePosition': e.detail.value
    })
  },
  slopeDirectionInput(e) {
    this.setData({
      'currDetail.slopeDirection': e.detail.value
    })
  },
  treeHeightInput(e) {
    this.setData({
      'currDetail.treeHeight': e.detail.value
    })
  },
  treeRadiusInput(e) {
    this.setData({
      'currDetail.treeRadius': e.detail.value
    })
  },
  descriptionInput(e){
    this.setData({
      'currDetail.description': e.detail.value
    })
  }
})