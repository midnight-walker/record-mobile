// pages/monitorDetail/description.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

let { promiseRequest } = require('../../utils/util.js');
const moment = require('../../utils/moment.js');
const imgUploader = require('../../utils/uploadImage');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["新增" , "已上传"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    selectMonitor:{},
    monitorSteps:[
      {
        id:1,
        name:"收虫"
      },
      {
        id:2,
        name:"换芯"
      },
      {
        id:3,
        name:"回收"
      }
    ],
    monitorStepIndex:0,
    files:[],
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });

    try {
      let selectMonitor = wx.getStorageSync('selectMonitor') || [];
      selectMonitor.monitor_detail_descriptions.sort((a,b)=>a.id>b.id).forEach(item => this.dataHelper(item));
      this.setData({
        selectMonitor
      });
    } catch (e) {
      wx.showModal({
        content: e.toString(),
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  dataHelper(obj){
    obj.createdTime=moment(obj.createdAt,'x').format('YYYY年MM月DD日 HH时mm分ss秒');
    obj.stepName = ['', '收虫', '换芯', '回收'][obj.monitorStepId];
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  monitorStepChange(e){
    this.setData({
      monitorStepIndex: parseInt(e.detail.value)
    });
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
  checkSaveData() {
    return new Promise((resolve, reject) => {
      let submitData = {
        monitorDetailId: this.data.selectMonitor.id,
        monitorStepId: this.data.monitorSteps[this.data.monitorStepIndex].id,
        description:this.data.description
      };
      if (!submitData.monitorDetailId) {
        reject('诱捕器编号缺失');
      }
      if (!this.data.files.length) {
        reject('请先选择照片！');
      } else {
        submitData.picture = this.data.files[0];
      }
      if (!submitData.monitorStepId) {
        reject('请选择维护类型');
      }
      resolve(submitData);
    })
  },
  saveMonitorDescription(){
    wx.showLoading({ title: '保存中' });
    setTimeout(() => {
      this.checkSaveData().then(submitData => {
        imgUploader([submitData.picture], "monitorDetail/" + submitData.monitorDetailId).then(pics => {
          submitData.picture=pics[0];
          promiseRequest('/api/createMonitorDetailDescription', submitData , "POST").then(res => {
            wx.hideLoading();
            if (res.success) {
              wx.showModal({
                content: '上传成功！',
                showCancel: false
              })
              let result=this.dataHelper(res.data.monitorDetailDescription),
                monitor_detail_descriptions = [...this.data.selectMonitor.monitor_detail_descriptions].concat(result);
              this.setData({
                'selectMonitor.monitor_detail_descriptions': monitor_detail_descriptions
              });
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
      });
    }, 100)
  },
  descriptionInput(e) {
    this.setData({
      'currDetail.description': e.detail.value
    })
  }
})