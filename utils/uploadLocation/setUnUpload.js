module.exports = (unUpload,str) =>{
  if (unUpload) {
    if (!unUpload.includes(str)) {
      unUpload.push(str);
    }
  } else {
    unUpload = [str]
  }
  wx.setStorageSync('unUploadLocation', unUpload);
}