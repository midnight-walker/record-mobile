// pages/supervisorDetail/mine.js
let { promiseRequest, findBy } = require('../../utils/util.js');
const moment = require('../../utils/moment.js');


Page({

  /**
   * 页面的初始数据
   */
  data: {
    supervisorDetailList: [],
    supervisorId: 0,
    operator: true,
    recordType: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },
  filterData(e) {
    let value = e.detail.value;
    if (!isNaN(value)) {
      this.setData({
        supervisorId: parseInt(value)
      })
      this.getData();
    } else if (value === '') {
      this.setData({
        supervisorId: 0
      })
      this.getData();
    } else {
      wx.showModal({
        content: '监理点编号必须是数字',
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  switchData(e) {
    this.setData({
      operator: e.detail.value
    });
    this.getData()
  },
  switchRecordType(e) {
    this.setData({
      recordType: e.detail.value
    });
    this.getData()
  },
  getData() {
    let data = {
      page: 1,
      pageSize: 100
    }
    if (this.data.operator) {
      data.operator = this.data.operator;
    }
    if (this.data.supervisorId) {
      data.supervisorId = this.data.supervisorId;
    }
    if (this.data.recordType) {
      data.onlyError = this.data.recordType;
    }
    wx.showLoading({ title: '加载中' });
    promiseRequest('/api/supervisorDetail', data).then(res => {
      res.data.forEach(item => {
        item.savedTime = moment(item.savedAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
        item.createdTime = moment(item.createdAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
        item.isError = item.record_types[0].type !== 0;
        item.typeName = item.record_types.reduce((p, next) => {
          return p + ' ' + next.name
        }, '');
      })
      this.setData({
        supervisorDetailList: res.data
      })
      wx.hideLoading();
    });
  },
  viewLocation(e){
    let id=e.target.dataset.id;
    if(!isNaN(id)){
      wx.navigateTo({
        url: 'map?id='+id
      });
    }
  }
})