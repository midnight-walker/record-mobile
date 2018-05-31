//app.js
const uploadLocation = require('utils/uploadLocation/index.js')
App({
  //apiUrl: "http://192.168.195.231:3000",
  apiUrl: "https://94oo.top",
  data:{
    lastUploadTime:+new Date()
  },
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var that=this;
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  onShow(){
    if (!this.data.globalItv){
      this.data.globalItv = setInterval(() => {
        let now = +new Date;
        if (now - this.data.lastUploadTime > 10*60*1000) {
          this.data.lastUploadTime = now;
          //uploadLocation();
        }
      }, 1000);
    }
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      console.log(this.globalData.userInfo);
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: true ,
        success: function(res) {
          console.log(res);
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null
  }
})
