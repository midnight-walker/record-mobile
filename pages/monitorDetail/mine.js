// pages/monitorDetail/mine.js
let { promiseRequest, findBy } = require('../../utils/util.js');
const moment = require('../../utils/moment.js');

function getMemberList(){
  let list=[{
    id:0,
    name:'全部'
  }]
  return list.concat(wx.getStorageSync('memberList'));
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    monitorDetailList: [],
    memberList:[],
    queryByDate:false,
    date:'',
    memberIndex:0,
    monitorId: 0,
    operator: true,
    recordType: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = moment().format('YYYY-MM-DD');
    this.setData({
      memberList: getMemberList(),
      date
    })
    this.getData()
  },
  filterData(e) {
    let value = e.detail.value;
    if (!isNaN(value)) {
      this.setData({
        monitorId: parseInt(value)
      })
      this.getData();
    } else if (value === '') {
      this.setData({
        monitorId: 0
      })
      this.getData();
    } else {
      wx.showModal({
        content: '监测点编号必须是数字',
        showCancel: false,
        confirmText: "确定"
      })
    }
  },
  switchRecordType(e) {
    this.setData({
      recordType: e.detail.value
    });
    this.getData();
  },
  switchQueryByDate(e){
    this.setData({
      queryByDate: e.detail.value
    });
    this.getData();
  },
  memberChange(e){
    this.setData({
      memberIndex: parseInt(e.detail.value)
    });
    this.getData();
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    });
    this.getData();
  },
  getData() {
    let query = {
      page: 1,
      pageSize: 100
    },data=this.data;
    /*if (this.data.operator) {
      query.operator = this.data.operator;
    }*/
    if (data.memberIndex != 0){
      let member=data.memberList[data.memberIndex];
      if (member && member.id){
        query.memberId = member.id
      }
    }
    if (data.queryByDate && data.date){
      let date=moment(data.date,'YYYY-MM-DD');
      query.startDate = date.format('x');
      query.endDate = date.add(1,'d').format('x');
    }
    if (data.monitorId) {
      query.monitorId = data.monitorId;
    }
    wx.showLoading({ title: '加载中' });
    promiseRequest('/api/monitorDetail', query).then(res => {
      res.data.forEach(item => {
        item.savedTime = moment(item.savedAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
        item.createdTime = moment(item.createdAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
      })
      this.setData({
        monitorDetailList: res.data
      })
      wx.hideLoading();
    });
  },
  viewLocation(e) {
    let { latitude, longitude, altitude } = e.target.dataset;
    if (latitude && longitude) {
      wx.openLocation({
        address: "",
        latitude,
        longitude,
        altitude
      })
    } else {
      wx.showModal({
        content: '未定位，无法查看当前位置的地图',
        showCancel: false
      })
    }
  },
  getWorm(e){
    let monitorDetail = e.target.dataset.monitor;
    if (monitorDetail) {
      wx.setStorageSync('selectMonitor', monitorDetail);
      wx.navigateTo({
        url: 'description'
      });
    }
  }
})