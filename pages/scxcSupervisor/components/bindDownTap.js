module.exports = {
  fcXianyanDown: function (e) {
    let value = parseInt(this.data.postData.fcXianyan) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcXianyan: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXixiaoDown: function (e) {
    let value = parseInt(this.data.postData.fcXixiao) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcXixiao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcGaodudayuwuDown: function (e) {
    let value = parseInt(this.data.postData.fcGaodudayuwu) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcGaodudayuwu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcChanzheDown: function (e) {
    let value = parseInt(this.data.postData.fcChanzhe) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcChanzhe: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcFugaiDown: function (e) {
    let value = parseInt(this.data.postData.fcFugai) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcFugai: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcFengzheDown: function (e) {
    let value = parseInt(this.data.postData.fcFengzhe) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcFengzhe: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcHuoshaoDown: function (e) {
    let value = parseInt(this.data.postData.fcHuoshao) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcHuoshao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXuanyaDown: function (e) {
    let value = parseInt(this.data.postData.fcXuanya) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcXuanya: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXuanguaDown: function (e) {
    let value = parseInt(this.data.postData.fcXuangua) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcXuangua: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcHuoshukuzhiDown: function (e) {
    let value = parseInt(this.data.postData.fcHuoshukuzhi) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcHuoshukuzhi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcTotalDown: function (e) {
    let value = parseInt(this.data.postData.fcTotal) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fcTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },

  jcFcFengzheDown: function (e) {
    let value = parseInt(this.data.postData.jcFcFengzhe) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcFcFengzhe: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongshuDown: function (e) {
    let value = parseInt(this.data.postData.jcFcSongshu) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcFcSongshu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongmuDown: function (e) {
    let value = parseInt(this.data.postData.jcFcSongmu) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcFcSongmu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongzhiDown: function (e) {
    let value = parseInt(this.data.postData.jcFcSongzhi) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcFcSongzhi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcShaotouDown: function (e) {
    let value = parseInt(this.data.postData.jcFcShaotou) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcFcShaotou: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcTotalDown: function (e) {
    let value = parseInt(this.data.postData.jcFcTotal) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcFcTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcCaogaiDown: function (e) {
    let value = parseInt(this.data.postData.jcYcCaogai) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcYcCaogai: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcKuyeDown: function (e) {
    let value = parseInt(this.data.postData.jcYcKuye) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcYcKuye: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTurangDown: function (e) {
    let value = parseInt(this.data.postData.jcYcTurang) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcYcTurang: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTengmanDown: function (e) {
    let value = parseInt(this.data.postData.jcYcTengman) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcYcTengman: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcDigouDown: function (e) {
    let value = parseInt(this.data.postData.jcYcDigou) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcYcDigou: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcDongxueDown: function (e) {
    let value = parseInt(this.data.postData.jcYcDongxue) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcYcDongxue: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTotalDown: function (e) {
    let value = parseInt(this.data.postData.jcYcTotal) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { jcYcTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongzhiDown: function (e) {
    let value = parseInt(this.data.postData.fsSongzhi) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fsSongzhi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongmuDown: function (e) {
    let value = parseInt(this.data.postData.fsSongmu) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fsSongmu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongcaiDown: function (e) {
    let value = parseInt(this.data.postData.fsSongcai) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fsSongcai: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzFazhuangDown: function (e) {
    let value = parseInt(this.data.postData.fzFazhuang) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzFazhuang: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzBopiDown: function (e) {
    let value = parseInt(this.data.postData.fzBopi) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzBopi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzJiahaoDown: function (e) {
    let value = parseInt(this.data.postData.fzJiahao) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzJiahao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzTouyaoDown: function (e) {
    let value = parseInt(this.data.postData.fzTouyao) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzTouyao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzShuliaoDown: function (e) {
    let value = parseInt(this.data.postData.fzShuliao) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzShuliao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzNituDown: function (e) {
    let value = parseInt(this.data.postData.fzNitu) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzNitu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzTotalDown: function (e) {
    let value = parseInt(this.data.postData.fzTotal) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzNumberDown: function (e) {
    let value = parseInt(this.data.postData.fzNumber) - 1;
    value = value >= 0 ? value : 0;
    let postData = Object.assign({}, this.data.postData, { fzNumber: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
}