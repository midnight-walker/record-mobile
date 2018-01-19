let moment = require('../moment.js');
let upload = require('./upload.js');
let setUnUpload=require('./setUnUpload.js');
module.exports = () => {
  let app = getApp();
  let now = moment();
  let unUpload = wx.getStorageSync('unUploadLocation');
  let key = 'locationData' + now.format('YYYYMMDD');
  let data = wx.getStorageSync(key);
  if (data) {
    upload(unUpload);
  } else {
    setUnUpload(unUpload, now.format('YYYY-MM-DD'));
    data=[];
  }

  wx.getLocation({
    type: 'wgs84',
    success: function (res) {
      console.log(res);
      data.push({
        timeStamp: now.format('x'),
        latitude: res.latitude,
        longitude: res.longitude
      });
      wx.setStorageSync(key, data);
    }
  });
}