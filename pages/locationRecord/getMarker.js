let markerIndex = 0;
let moment = require('../../utils/moment.js');
function getMarker(marker){
  let result = {
    id: markerIndex++,
    iconPath: "/resources/marker.png",
    width: 20,
    height: 20,
    latitude: marker.latitude,
    longitude: marker.longitude,
    callout:{
      content: moment(marker.timeStamp,'x').format('YYYY年MM月DD日 HH:mm:ss'),
      padding:5
    }
  }
  return result;
}
function getPolyline(marker){
  return {
    longitude: marker.longitude,
    latitude: marker.latitude
  }
}
module.exports = () => {
  let key = 'locationData' + moment().format('YYYYMMDD');
  let points=wx.getStorageSync(key);
  let markers=[],polyline=[{
    points: [],
    color: "#FF0000DD",
    width: 2,
    dottedLine: true,
    arrowLine:true
  }];
  if (points){
    points.forEach(marker=>{
      markers.push(getMarker(marker));
      polyline[0].points.push(getPolyline(marker));
    })
  }
  return {
    markers,
    polyline
  }
}