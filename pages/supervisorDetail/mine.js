// pages/supervisorDetail/mine.js
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
    supervisorDetailList: [],
    memberList:[],
    queryByDate:false,
    date:'',
    memberIndex:0,
    supervisorId: 0,
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
    if (data.supervisorId) {
      query.supervisorId = data.supervisorId;
    }
    if (data.recordType) {
      query.onlyError = data.recordType;
    }
    wx.showLoading({ title: '加载中' });
    promiseRequest('/api/supervisorDetail', query).then(res => {
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