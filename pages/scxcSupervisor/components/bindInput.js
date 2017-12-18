module.exports = {
  villageChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { village: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  groupChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { group: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  smallClassChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { smallClass: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  placeNameChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { placeName: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  smallClassAreaChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { smallClassArea: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  treeComposeChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { treeCompose: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  targetNameChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { targetName: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  timeChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { time: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  workGroupChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { workGroup: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXianyanChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcXianyan: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXixiaoChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcXixiao: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcGaodudayuwuChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcGaodudayuwu: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcChanzheChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcChanzhe: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcFugaiChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcFugai: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcFengzheChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcFengzhe: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcHuoshaoChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcHuoshao: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXuanyaChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcXuanya: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXuanguaChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcXuangua: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcHuoshukuzhiChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcHuoshukuzhi: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcTotalChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fcTotal: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  
  jcFcFengzheChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcFcFengzhe: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongshuChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcFcSongshu: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongmuChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcFcSongmu: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongzhiChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcFcSongzhi: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcShaotouChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcFcShaotou: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcTotalChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcFcTotal: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcCaogaiChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcYcCaogai: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcKuyeChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcYcKuye: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTurangChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcYcTurang: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTengmanChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcYcTengman: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcDigouChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcYcDigou: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcDongxueChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcYcDongxue: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTotalChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { jcYcTotal: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongzhiChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fsSongzhi: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongmuChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fsSongmu: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongcaiChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fsSongcai: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzFazhuangChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzFazhuang: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzBopiChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzBopi: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzJiahaoChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzJiahao: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzTouyaoChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzTouyao: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzShuliaoChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzShuliao: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzNituChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzNitu: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzTotalChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzTotal: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzNumberChange: function (e) {
    let postData = Object.assign({}, this.data.postData, { fzNumber: e.detail.value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
}