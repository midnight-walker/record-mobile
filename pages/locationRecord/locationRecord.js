// pages/locationRecord/locationRecord.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude:0,
    longitude: 0,
    markers: [],
    polyline: [],
    controls: [{
      id: 1,
      iconPath: '/resources/control.png',
      position: {
        left: 0,
        top: 0,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let positionData = require('./getMarker.js')();
    console.log(positionData);
    wx.getLocation({
      type: 'wgs84',
      success: (res) =>{
        console.log(res);
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: positionData.markers,
          polyline:positionData.polyline
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  callouttap(e){
    console.log(e);
  }
})