//index.js
let {promiseRequest}=require('../../utils/util.js');
let getRemoteData = require('../../utils/getRemoteData/index.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '欢迎使用林监宝',
    userInfo: {},
    authed:0
  },
  //事件处理函数
  bindViewTap: function() {
    console.log(123);
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    
  },
  onShow:function(){
    var that = this;
    
    wx.login({
      success: (loginData) =>{
        if (loginData.code) {
          //发起网络请求
          wx.getUserInfo({
            withCredentials: true,
            success: (user) =>{
              wx.request({
                url: app.apiUrl + "/api/validateWx",
                method: 'GET',
                data: {
                  code: loginData.code,
                  iv: user.iv,
                  encryptedData: user.encryptedData
                },
                header: {
                  'Cookie': 'SESSIONID=' + wx.getStorageSync('SESSIONID'),
                  'content-type': 'application/json'
                },
                success:(res)=> {
                  if (res.data.success) {
                    this.setData({
                      authed: 1,
                      userInfo: user.userInfo
                    })
                    let sessionString = res.header["Set-Cookie"];
                    if (sessionString && sessionString.indexOf('SESSIONID') > -1 && res.data.data===1) {
                      wx.setStorageSync('SESSIONID', sessionString.match(/SESSIONID=(\w*);/)[1]);
                    }
                    getRemoteData();
                  } else {
                    this.setData({
                      authed: 2
                    })
                    wx.showModal({
                      content: res.data.message,
                      showCancel: false
                    })
                  }
                },
                fail: function () {
                  wx.showModal({
                    content: '网络错误',
                    showCancel: false
                  })
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})
