// pages/supervisorDetail/mine.js
let { promiseRequest,findBy } = require('../../utils/util.js');
const moment = require('../../utils/moment.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    supervisorDetailList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let recordTypeList = wx.getStorageSync('recordTypeList'),
      supervisorList = wx.getStorageSync('supervisorList') || [];

    promiseRequest('/api/supervisorDetail', {
      page:1,
      pageSize:30
    }).then(res => {
      res.data.forEach(item=>{
        item.timeStr = moment(item.createdAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
        item.supervisor = supervisorList.find(s => s.id === item.supervisorId) || {};
        item.recordTypeName = findBy(recordTypeList, item.recordTypeId);
      })
      this.setData({
        supervisorDetailList:res.data
      })
    }).catch(e => {
      wx.showModal({
        content: e.toString(),
        showCancel: false,
        confirmText: "确定"
      })
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

  }
})