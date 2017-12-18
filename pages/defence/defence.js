var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    region:[],
    regionIndex:0
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    wx.request({
      url: 'https://94oo.top/api/region', //仅为示例，并非真实的接口地址
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          region: res.data
        })
      }
    })
  }
})