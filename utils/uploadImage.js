const Upyun = require('upyun-wxapp-sdk')
const moment = require('moment.js');
const upyun = new Upyun({
  bucket: 'ljb-image',
  operator: 'tsq',
  getSignatureUrl: 'https://94oo.top/auth'
})
const imageServer = 'http://ljb-image.test.upcdn.net';

let upload=function(img){
  return new Promise((resolve,reject)=>{
    let now = moment();
    upyun.upload({
      localPath: img,
      remotePath: '/' + now.format('YYYY') + '/' + now.format('MM') + '/' + now.format('DD') + '/' + img.split('//')[1],
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

module.exports=function(imgList){
  return new Promise((resolve,reject)=>{
    Promise.all(imgList.map((img) => {
      return upload(img);
    })).then(resolve, reject);
  })
}