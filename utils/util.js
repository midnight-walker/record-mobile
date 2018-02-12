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

function endPromise(msg){
  wx.hideLoading();
  wx.showModal({
    content: msg,
    showCancel: false
  })
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
        } else if (res.data.code===-1){
          getAuth().then(res=>{
            endPromise('网络错误，请重试');
          })
        } else {
          endPromise(res.data.message);
        }
      },
      fail: function (e) {
        endPromise("获取数据失败");
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

function getAuth(){
  return new Promise((resolve,reject)=>{
    wx.login({
      success: (loginData) => {
        if (loginData.code) {
          //发起网络请求
          wx.getUserInfo({
            withCredentials: true,
            success: (user) => {
              let sessionId = wx.getStorageSync('SESSIONID');
              wx.request({
                url: app.apiUrl + "/api/validateWx",
                method: 'GET',
                data: {
                  appId: 0,
                  code: loginData.code,
                  iv: user.iv,
                  encryptedData: user.encryptedData
                },
                header: {
                  'Cookie': sessionId ? 'SESSIONID=' + wx.getStorageSync('SESSIONID') : '',
                  'content-type': 'application/json'
                },
                success: (res) => {
                  if (res.data.success) {
                    let sessionString = res.header["Set-Cookie"];
                    if (sessionString && sessionString.indexOf('SESSIONID') > -1 && res.data.data === 1) {
                      wx.setStorageSync('SESSIONID', sessionString.match(/SESSIONID=(\w*);/)[1]);
                    }
                    resolve(user.userInfo);
                  } else {
                    reject(res.data.message);
                  }
                },
                fail: function () {
                  reject('网络错误')
                }
              })
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  })
}

module.exports = {
  formatTime,
  findBy,
  promiseRequest,
  getAuth
}
