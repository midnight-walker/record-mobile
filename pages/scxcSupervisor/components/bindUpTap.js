module.exports = {
  fcXianyanUp: function (e) {
    let value = parseInt(this.data.postData.fcXianyan) + 1;
    let postData = Object.assign({}, this.data.postData, { fcXianyan: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXixiaoUp: function (e) {
    let value = parseInt(this.data.postData.fcXixiao) + 1;
    let postData = Object.assign({}, this.data.postData, { fcXixiao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcGaodudayuwuUp: function (e) {
    let value = parseInt(this.data.postData.fcGaodudayuwu) + 1;
    let postData = Object.assign({}, this.data.postData, { fcGaodudayuwu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcChanzheUp: function (e) {
    let value = parseInt(this.data.postData.fcChanzhe) + 1;
    let postData = Object.assign({}, this.data.postData, { fcChanzhe: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcFugaiUp: function (e) {
    let value = parseInt(this.data.postData.fcFugai) + 1;
    let postData = Object.assign({}, this.data.postData, { fcFugai: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcFengzheUp: function (e) {
    let value = parseInt(this.data.postData.fcFengzhe) + 1;
    let postData = Object.assign({}, this.data.postData, { fcFengzhe: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcHuoshaoUp: function (e) {
    let value = parseInt(this.data.postData.fcHuoshao) + 1;
    let postData = Object.assign({}, this.data.postData, { fcHuoshao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXuanyaUp: function (e) {
    let value = parseInt(this.data.postData.fcXuanya) + 1;
    let postData = Object.assign({}, this.data.postData, { fcXuanya: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcXuanguaUp: function (e) {
    let value = parseInt(this.data.postData.fcXuangua) + 1;
    let postData = Object.assign({}, this.data.postData, { fcXuangua: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcHuoshukuzhiUp: function (e) {
    let value = parseInt(this.data.postData.fcHuoshukuzhi) + 1;
    let postData = Object.assign({}, this.data.postData, { fcHuoshukuzhi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fcTotalUp: function (e) {
    let value = parseInt(this.data.postData.fcTotal) + 1;
    let postData = Object.assign({}, this.data.postData, { fcTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },

  jcFcFengzheUp: function (e) {
    let value = parseInt(this.data.postData.jcFcFengzhe) + 1;
    let postData = Object.assign({}, this.data.postData, { jcFcFengzhe: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongshuUp: function (e) {
    let value = parseInt(this.data.postData.jcFcSongshu) + 1;
    let postData = Object.assign({}, this.data.postData, { jcFcSongshu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongmuUp: function (e) {
    let value = parseInt(this.data.postData.jcFcSongmu) + 1;
    let postData = Object.assign({}, this.data.postData, { jcFcSongmu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcSongzhiUp: function (e) {
    let value = parseInt(this.data.postData.jcFcSongzhi) + 1;
    let postData = Object.assign({}, this.data.postData, { jcFcSongzhi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcShaotouUp: function (e) {
    let value = parseInt(this.data.postData.jcFcShaotou) + 1;
    let postData = Object.assign({}, this.data.postData, { jcFcShaotou: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcFcTotalUp: function (e) {
    let value = parseInt(this.data.postData.jcFcTotal) + 1;
    let postData = Object.assign({}, this.data.postData, { jcFcTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcCaogaiUp: function (e) {
    let value = parseInt(this.data.postData.jcYcCaogai) + 1;
    let postData = Object.assign({}, this.data.postData, { jcYcCaogai: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcKuyeUp: function (e) {
    let value = parseInt(this.data.postData.jcYcKuye) + 1;
    let postData = Object.assign({}, this.data.postData, { jcYcKuye: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTurangUp: function (e) {
    let value = parseInt(this.data.postData.jcYcTurang) + 1;
    let postData = Object.assign({}, this.data.postData, { jcYcTurang: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTengmanUp: function (e) {
    let value = parseInt(this.data.postData.jcYcTengman) + 1;
    let postData = Object.assign({}, this.data.postData, { jcYcTengman: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcDigouUp: function (e) {
    let value = parseInt(this.data.postData.jcYcDigou) + 1;
    let postData = Object.assign({}, this.data.postData, { jcYcDigou: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcDongxueUp: function (e) {
    let value = parseInt(this.data.postData.jcYcDongxue) + 1;
    let postData = Object.assign({}, this.data.postData, { jcYcDongxue: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  jcYcTotalUp: function (e) {
    let value = parseInt(this.data.postData.jcYcTotal) + 1;
    let postData = Object.assign({}, this.data.postData, { jcYcTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongzhiUp: function (e) {
    let value = parseInt(this.data.postData.fsSongzhi) + 1;
    let postData = Object.assign({}, this.data.postData, { fsSongzhi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongmuUp: function (e) {
    let value = parseInt(this.data.postData.fsSongmu) + 1;
    let postData = Object.assign({}, this.data.postData, { fsSongmu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fsSongcaiUp: function (e) {
    let value = parseInt(this.data.postData.fsSongcai) + 1;
    let postData = Object.assign({}, this.data.postData, { fsSongcai: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzFazhuangUp: function (e) {
    let value = parseInt(this.data.postData.fzFazhuang) + 1;
    let postData = Object.assign({}, this.data.postData, { fzFazhuang: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzBopiUp: function (e) {
    let value = parseInt(this.data.postData.fzBopi) + 1;
    let postData = Object.assign({}, this.data.postData, { fzBopi: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzJiahaoUp: function (e) {
    let value = parseInt(this.data.postData.fzJiahao) + 1;
    let postData = Object.assign({}, this.data.postData, { fzJiahao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzTouyaoUp: function (e) {
    let value = parseInt(this.data.postData.fzTouyao) + 1;
    let postData = Object.assign({}, this.data.postData, { fzTouyao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzShuliaoUp: function (e) {
    let value = parseInt(this.data.postData.fzShuliao) + 1;
    let postData = Object.assign({}, this.data.postData, { fzShuliao: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzNituUp: function (e) {
    let value = parseInt(this.data.postData.fzNitu) + 1;
    let postData = Object.assign({}, this.data.postData, { fzNitu: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzTotalUp: function (e) {
    let value = parseInt(this.data.postData.fzTotal) + 1;
    let postData = Object.assign({}, this.data.postData, { fzTotal: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
  fzNumberUp: function (e) {
    let value = parseInt(this.data.postData.fzNumber) + 1;
    let postData = Object.assign({}, this.data.postData, { fzNumber: value });
    this.setData({ postData });wx.setStorage({key:"scxcData",data:postData});
  },
}