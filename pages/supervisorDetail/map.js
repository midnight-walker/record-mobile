// pages/supervisorDetail/map.js
let getMarker = require('../../utils/map/getMarker.js');
let moment=require('../../utils/moment.js');
let { promiseRequest } = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    markers: [],
    polyline: [],
    showLayer:false,
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
    }],
    date:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.id){
      this.getById(options.id);
    }else{
      let date = moment().format('YYYY-MM-DD');
      this.setData({
        date
      })
      this.getByDate();
    }
    
    /*let positionData=getMarker();
    console.log(positionData);
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        console.log(res);
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          markers: positionData.markers,
          polyline: positionData.polyline
        });
      }
    });*/
  },
  getByDate(){
    let query = {};
    if (this.data.date) {
      let now = moment(this.data.date, "YYYY-MM-DD");
      query.startDate = parseInt(now.format('x'));
      query.endDate = query.startDate + 24 * 60 * 60 * 1000;
    }
    if (this.data.supervisorId) {
      query.supervisorId = this.data.supervisorId
    }
    this.getData(query).then(res=>{

    }).catch(e=>{
      this.setData({
        showLayer: true
      })
      wx.showModal({
        content: '当前日期无数据',
        showCancel: false,
        confirmText: "确定"
      })
    })
  },
  getById(id){
    this.getData({id}).then(res => {

    }).catch(e => {
      this.setData({
        showLayer: true
      })
      wx.showModal({
        content: '未查询到指定数据',
        showCancel: false,
        confirmText: "确定"
      })
    })
  },
  getData(query){
    return new Promise((resolve,reject)=>{
      promiseRequest('/api/supervisorDetail', query).then(res => {
        res.data.forEach(item => {
          item.typeName = item.record_types.reduce((p, next) => {
            return p + ' ' + next.name
          }, '');
          item.savedTime = moment(item.savedAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
          item.createdTime = moment(item.createdAt, 'x').format('YYYY年MM月DD日 HH时mm分ss秒');
          item.content = '保存时间:' + moment(item.savedAt, 'x').format('YYYY年MM月DD日 HH:mm:ss') +
            '\n上传时间:' + moment(item.createdAt, 'x').format('YYYY年MM月DD日 HH:mm:ss') +
            '\n监理点编号:' + item.supervisor.id +
            '\n危害类型:' + item.typeName +
            '\n监理员:' + item.member.name;
        })
        let markers = getMarker(res.data).markers;
        console.log(markers);
        if (markers.length) {
          this.setData({
            markers,
            latitude: markers[0].latitude,
            longitude: markers[0].longitude,
          })
          resolve();
        } else {
          reject();
        }
      })
    })
  },
  queryData() {
    this.setData({
      showLayer: false
    })
    this.getData();
  },
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    this.setData({
      showLayer: true
    })
  },
  callouttap(e) {
    console.log(e);
  }
})