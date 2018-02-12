//index.js
let {promiseRequest,getAuth}=require('../../utils/util.js');
let getRemoteData = require('../../utils/getRemoteData/index.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎使用林监宝',
    userInfo: {},
    authed:0,
    showRefresh:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    this.getBaseData();
  },
  refreshData:function(){
    wx.removeStorageSync('SESSIONID');
    this.setData({
      showRefresh:false
    })
    this.getBaseData();
  },
  getBaseData:function(){
    getAuth().then(userInfo => {
      this.setData({
        authed: 1,
        userInfo
      })
      getRemoteData();
    }).catch(e => {
      this.setData({
        authed: 2
      })
      wx.showModal({
        content: e,
        showCancel: false
      })
    })
  },
  onShow: function () {
    /*let sessionId = wx.getStorageSync('SESSIONID');
    if (!sessionId){
      this.getBaseData();
    }
    else{
      wx.getUserInfo({
        withCredentials: true,
        success: (user) => {
          this.setData({
            authed: 1,
            userInfo: user.userInfo 
          })
        }
      })
    }*/
  }
})
