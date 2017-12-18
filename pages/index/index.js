//index.js


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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      console.log(userInfo);
      wx.request({
        url: 'https://94oo.top/api/validateUser',
        data: {
          wxname: userInfo.nickName
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (!res.data.length) {
            that.setData({
              authed: 2
            })
          } else {
            that.setData({
              authed: 1,
              userInfo: userInfo
            })
          }
        }
      })

    })
  }
})
