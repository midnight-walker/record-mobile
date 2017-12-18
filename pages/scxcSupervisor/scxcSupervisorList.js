
const moment = require('../../utils/moment.js');


var app = getApp()
Page({
  data: {
    userInfo: {},
    list:[],
    region:[],
    station:[]
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
      wx.request({
        url: 'https://94oo.top/api/region',
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
      wx.request({
        url: 'https://94oo.top/api/station',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          that.setData({
            station: res.data
          })
        }
      })
      wx.request({
        url: 'https://94oo.top/api/scxcSupervisor',
        data: { operator: userInfo.nickName},
        method: 'get',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode === 200) {
            if(res.data.length){
              let itv=setInterval(()=>{
                if (that.data.region.length && that.data.station.length){
                  clearInterval(itv);
                  setListData();
                }
              },200)
              function setListData(){
                res.data.forEach(item => {
                  item.createTime = moment(item.createdAt).format('YYYY年MM月DD日 HH时mm分ss秒');
                  let region = that.data.region.find(r=>r.id==item.regionId);
                  let station = that.data.station.find(s => s.id == item.stationId);
                  item.regionName=region?region.name:'';
                  item.stationName=station?station.name:'';
                })
                console.log(res.data);
                that.setData({
                  list: res.data
                })
              }
              
            }else{
              wx.showModal({
                content: '你还没有提交过监理记录',
                showCancel: false
              })
            }
            
          } else {
            wx.showToast({
              title: '网络错误',
              icon:'loading',
              duration: 3000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack();
                }, 3000)
              }
            })
          }
        }
      })
    })
    
  },
  viewDetail:function(e){
    let idx=e.currentTarget.dataset.index;
    let data = this.data.list[idx];
    data.time=moment(data.time).format('YYYY-MM-DD');
    data.picture='';
    wx.setStorage({
      key: "scxcData",
      data: data,
      success:()=>{
        wx.navigateTo({
          url:'scxcSupervisor?edit=1'
        });
      }
    })
  }
})