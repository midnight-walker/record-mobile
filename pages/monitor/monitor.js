var app = getApp()

var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置


let { promiseRequest } = require('../../utils/util.js');
const moment = require('../../utils/moment.js');

let defaultDetail = () => {
  return {
    region: '',
    station: '',
    village: '',
    group: '', 
    smallClass: '',
    smallClassArea: '',
    placeName: '',
    treeCompose: '',
    treeDensity: '',
    crownDensity: '',
    projectId: 4
  }
}


Page({
  data: {
    tabs: ["新增监测点", "监测点查询"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    currDetail: defaultDetail(),
    monitorList:[]
  },
  onLoad: function () {
    var that = this
    
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  checkSaveData() {
    return new Promise((resolve, reject) => {
      let submitData = this.data.currDetail;
      if (!submitData.projectId) {
        reject('项目ID缺失');
      }
      if (!submitData.region) {
        reject('请输入区县');
      }
      if (!submitData.station) {
        reject('请输入乡镇');
      }
      if (!submitData.village) {
        reject('请输入村');
      }
      if (!submitData.group) {
        reject('请输入社');
      }
      if (!submitData.placeName) {
        reject('请输入小地名');
      }
      if (!submitData.treeCompose) {
        reject('请输入树种组成');
      }
      if (isNaN(submitData.treeDensity)) {
        reject('请输入林密度必须是数字');
      }
      if (isNaN(submitData.crownDensity)) {
        reject('请输入郁闭度必须是数字');
      }
      resolve(submitData);
    })
  },
  saveMonitor() {
    wx.showLoading({ title: '保存中' });
    setTimeout(() => {
      this.checkSaveData().then(submitData => {
        promiseRequest('/api/monitor', submitData, "POST").then(res => {
          wx.hideLoading();
          if (res.success && res.data.id) {
            wx.showModal({
              content: '上传成功！此监测点的编号为：'+res.data.id,
              showCancel: false
            })
            promiseRequest('/api/monitor', {}).then(mRes => {
              console.log(mRes.data);
              mRes.success && wx.setStorageSync('monitorList',mRes.data);
            })
            this.setData({
              currDetail: defaultDetail()
            })
          } else {
            throw new Error(res.message);
          }
        }).catch(e => {
          throw new Error(e);
        })
      }).catch(e=>{
        e = typeof e === 'string' ? e : e.toString()
        wx.hideLoading();
        wx.showModal({
          content: e,
          showCancel: false
        })
      });
    }, 100)
  },
  getMonitor(e){
    let placeName = e.detail.value;
    if(!placeName){
      return;
    }
    wx.showLoading({ title: '查询中' });
    promiseRequest('/api/monitor', {placeName}, "GET").then(res => {
      wx.hideLoading();
      if (res.success) {
        if (res.data && !res.data.length){
          wx.showModal({
            content: '未查询到于' + placeName +'相关的监测点',
            showCancel: false
          })
        }
        this.setData({
          monitorList:res.data
        })
      }
    }).catch(e => {
      throw new Error(e);
    })
  },
  /*

  事件绑定

  */
  projectIdInput(e) {
    this.setData({
      'currDetail.projectId': e.detail.value
    })
  },
  regionInput(e) {
    this.setData({
      'currDetail.region': e.detail.value
    })
  },
  stationInput(e) {
    this.setData({
      'currDetail.station': e.detail.value
    })
  },
  villageInput(e) {
    this.setData({
      'currDetail.village': e.detail.value
    })
  },
  groupInput(e) {
    this.setData({
      'currDetail.group': e.detail.value
    })
  }, 
  smallClassInput(e) {
    this.setData({
      'currDetail.smallClass': e.detail.value
    })
  },
  smallClassAreaInput(e) {
    this.setData({
      'currDetail.smallClassArea': e.detail.value
    })
  },
  placeNameInput(e) {
    this.setData({
      'currDetail.placeName': e.detail.value
    })
  },
  treeComposeInput(e) {
    this.setData({
      'currDetail.treeCompose': e.detail.value
    })
  },
  treeDensityInput(e) {
    this.setData({
      'currDetail.treeDensity': e.detail.value
    })
  },
  crownDensityInput(e) {
    this.setData({
      'currDetail.crownDensity': e.detail.value
    })
  }
})