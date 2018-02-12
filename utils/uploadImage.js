const Upyun = require('upyun-wxapp-sdk')
const moment = require('moment.js');
const upyun = new Upyun({
  bucket: 'ljb-image',
  operator: 'tsq',
  getSignatureUrl: 'https://94oo.top/auth'
})
const imageServer = 'http://ljb-image.test.upcdn.net';

let upload = function (img, path){
  return new Promise((resolve,reject)=>{
    let now = moment(),
      arr = img.split('.'),
      len = arr.length;
    upyun.upload({
      localPath: img,
      remotePath: '/' + path + '/' + now.format('YYYY_HH_MM_DD_mm_ss_SSS')+'.'+ arr[len-1],
      success: function (res) {
        console.log('uploadImage success, res is:', res)
        resolve(imageServer + JSON.parse(res.data).url);
      },
      fail: function ({ errMsg }) {
        reject('uploadImage fail, errMsg is', errMsg)
      }
    })
  })
}

module.exports=function(imgList,path){
  return new Promise((resolve,reject)=>{
    Promise.all(imgList.map((img) => {
      return upload(img, path);
    })).then(resolve, reject);
  })
}