var app = getApp();
function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function promiseRequest(url, data, method = "GET") {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.apiUrl + url,
      method: method,
      data: data, 
      header: {
        'Cookie': 'SESSIONID=' + wx.getStorageSync('SESSIONID'),
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.success) {
          resolve(res.data);
        } else {
          reject(res.data.message)
        } 
      },
      fail: function () {
        reject("获取数据失败")
      }
    })
  })
}

function findBy(arr,value,id="id",name="name"){
  if(arr.length){
    let result = arr.find(item => item[id]===value);
    return result?result[name]:'';
  }
  return '';
}

module.exports = {
  formatTime,
  findBy,
  promiseRequest
}
