const Upyun = require('../../utils/upyun-wxapp-sdk')
const upyun = new Upyun({
  bucket: 'ljb-image',
  operator: 'tsq',
  getSignatureUrl: 'https://94oo.top/auth'
})
const imageServer = 'http://ljb-image.test.upcdn.net';
const moment = require('../../utils/moment.js');
const tooltip = require('data.js');
const switchPage=require('components/switchPage');
const inputEvent = require('components/bindInput');
const upTap = require('components/bindUpTap');
const downTap = require('components/bindDownTap');

let getPostData=function(){
  return {
    region: 0,
    station: 0,
    regionId: 0,
    stationId: 0,
    village: "",
    group: "",
    smallClass: "",
    placeName: "",
    smallClassArea: "",
    treeCompose: "",
    targetName: "",
    time: moment().format('YYYY-MM-DD'),
    workGroup: "",
    fcXianyan: 0,
    fcXixiao: 0,
    fcGaodudayuwu: 0,
    fcChanzhe: 0,
    fcFugai: 0,
    fcFengzhe: 0,
    fcHuoshao: 0,
    fcXuanya: 0,
    fcXuangua: 0,
    fcHuoshukuzhi: 0,
    fcTotal: 0,
    jcFcFengzhe: 0,
    jcFcSongshu: 0,
    jcFcSongmu: 0,
    jcFcSongzhi: 0,
    jcFcShaotou: 0,
    jcFcTotal: 0,
    jcYcCaogai: 0,
    jcYcKuye: 0,
    jcYcTurang: 0,
    jcYcTengman: 0,
    jcYcDigou: 0,
    jcYcDongxue: 0,
    jcYcTotal: 0,
    fsSongzhi: 0,
    fsSongmu: 0,
    fsSongcai: 0,
    fzFazhuang: 0,
    fzBopi: 0,
    fzJiahao: 0,
    fzTouyao: 0,
    fzShuliao: 0,
    fzNitu: 0,
    fzTotal: 0,
    fzNumber: 0
  }
}

var app = getApp();
let option = {
  data: {
    isSubmit: false,
    showPage: 1,
    userInfo: {},
    region: [],
    station: [],
    showImage: [],
    uploadedImage: [],
    time: moment().format('YYYY-MM-DD'),
    latitude: 0,
    longitude: 0,
    postData:getPostData(),
    isEdit:0
  },
  onLoad: function (opt) {
    var that = this;
    if(opt.edit){
      this.setData({
        isEdit:1
      })
    }
    wx.getStorage({
      key:'scxcData',
      success:function(e){
        e.data.time = moment().format('YYYY-MM-DD');
        that.setData({
          postData: Object.assign({}, that.data.postData,e.data)
        });
      }
    })
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log(res);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        //var speed = res.speed
        //var accuracy = res.accuracy
      }
    });
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
    this.getRegion();
  },
  getRegion() {
    var that = this;
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
        that.getStation(res.data[that.data.postData.region].id);
      }
    })
  },
  getStation(regionId) {
    var that = this;
    wx.request({
      url: 'https://94oo.top/api/station',
      data: {
        regionId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          station: res.data
        })
      }
    })
  },
  chooseRegion(e) {
    let region = parseInt(e.detail.value);
    let postData = Object.assign({}, this.data.postData, {
      region,
      station: 0
    })
    this.setData({
      postData
    })
    this.getStation(this.data.region[region].id);
  },
  chooseStation(e) {
    let station = parseInt(e.detail.value);
    let postData = Object.assign({}, this.data.postData, {
      station
    });
    this.setData({
      postData 
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  chooseImage: function () {
    const self = this

    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log('chooseImage success, temp path is', res.tempFilePaths[0])

        const imageSrc = res.tempFilePaths[0], now = moment();
        upyun.upload({
          localPath: imageSrc,
          remotePath: '/' + now.format('YYYY') + '/' + now.format('MM') + '/' + now.format('DD') + '/' + imageSrc.split('tmp/')[1],
          success: function (res) {
            console.log('uploadImage success, res is:', res)

            wx.showToast({
              title: '上传成功',
              icon: 'success',
              duration: 1000
            })
            let showImage = self.data.showImage, uploadedImage = self.data.uploadedImage;
            showImage.push({ imageSrc });
            uploadedImage.push(imageServer + JSON.parse(res.data).url);
            self.setData({
              showImage,
              uploadedImage
            })

          },
          fail: function ({ errMsg }) {
            console.log('uploadImage fail, errMsg is', errMsg)
          }
        })
      },
      fail: function ({ errMsg }) {
        console.log('chooseImage fail, err is', errMsg)
      }
    })
  },
  resetForm:function(){
    let data = getPostData();
    wx.setStorage({ key: "scxcData", data: data });
    this.setData({
      postData: data
    })
  },
  formSubmit: function (e) {
    var that=this;
    if (!this.data.isSubmit){
      this.setData({
        isSubmit:true
      })
      let formData = this.data.postData, data = this.data;
      if (!data.region.length) {
        wx.showToast({
          title: '区县信息错误',
          icon: 'loading',
          duration: 2000
        })

        this.setData({
          isSubmit: false
        })
      }
      if (!data.station.length) {
        wx.showToast({
          title: '乡镇信息错误',
          icon: 'loading',
          duration: 2000
        })

        this.setData({
          isSubmit: false
        })
      }

      formData.regionId = data.region[formData.region].id;
      formData.stationId = data.station[formData.station].id;
      formData.picture = data.uploadedImage.join(',');
      formData.latitude = data.latitude;
      formData.longitude = data.longitude;
      formData.operator = data.userInfo.nickName;
      formData.time = moment(formData).format('x');
      function getKeySum(list) {
        return list.reduce(function (p, item) {
          return p + parseInt(formData[item])
        }, 0)
      }

      formData.fcTotal = getKeySum(['fcXianyan', 'fcXixiao', 'fcGaodudayuwu', 'fcChanzhe', 'fcFugai', 'fcFengzhe', 'fcHuoshao', 'fcXuanya', 'fcXuangua', 'fcHuoshukuzhi']);
      formData.jcFcTotal = getKeySum(['jcFcFengzhe', 'jcFcSongshu', 'jcFcSongmu', 'jcFcSongzhi', 'jcFcShaotou']);
      formData.jcYcTotal = getKeySum(['jcYcCaogai', 'jcYcKuye', 'jcYcTurang', 'jcYcTengman', 'jcYcDigou', 'jcYcDongxue']);
      formData.fzTotal = getKeySum(['fzFazhuang', 'fzBopi', 'fzJiahao', 'fzTouyao', 'fzShuliao', 'fzNitu']);

      for (var key in tooltip) {
        if (formData[key] === '') {
          wx.showModal({
            content: '请填写' + tooltip[key],
            showCancel: false
          })
          this.setData({
            isSubmit: false
          })
          return;
        }
      }

      wx.request({
        url: 'https://94oo.top/api/scxcSupervisor',
        data: formData,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode === 200) {
            wx.setStorage({ key: "scxcData", data: data });
            wx.showToast({
              title: '保存成功',
              duration: 3000,
              success: function () {
                setTimeout(function () {
                  wx.navigateBack();
                }, 3000)
              }
            })
          } else {
            this.setData({
              isSubmit: false
            })
            wx.showModal({
              content: JSON.stringify(res),
              showCancel: false
            })
          }
        }
      })
    }
    
  }
}
Page(Object.assign(option, switchPage, inputEvent, upTap, downTap))