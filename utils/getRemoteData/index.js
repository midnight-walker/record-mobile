let { promiseRequest } = require('../util.js');
module.exports = () => {
  Promise.all([
    promiseRequest('/api/project', {}),
    promiseRequest('/api/supervisor', {}),
    promiseRequest('/api/recordType', {}),
    promiseRequest('/api/members/list', {}),
    promiseRequest('/api/monitor', {})
  ]).then(res => {
    let recordTypeList = res[2].data;
    res[1].data.forEach(item=>{
      item.showName=item.village+'-'+item.placeName;
    })
    wx.setStorageSync('projectList', res[0].data);
    wx.setStorageSync('supervisorList', res[1].data);
    wx.setStorageSync('recordTypeList', recordTypeList);
    wx.setStorageSync('recordTypeCate1', recordTypeList.filter(item => !item.pid));
    wx.setStorageSync('recordTypeCate2', recordTypeList.filter(item => item.pid));
    wx.setStorageSync('memberList', res[3].data.filter(item => item.id > 5));
    wx.setStorageSync('monitorList', res[4].data);
  }).catch(e => {
    wx.showModal({
      content: e.toString(),
      showCancel: false,
      confirmText: "确定"
    })
  });
}