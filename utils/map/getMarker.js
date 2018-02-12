let moment = require('../../utils/moment.js');
function getMarker(marker){
  let result = {
    id: marker.id,
    iconPath: "/resources/marker.png",
    width: 20,
    height: 20,
    latitude: marker.latitude,
    longitude: marker.longitude,
    callout:{
      content:marker.content,
      padding:5
    }
  }
  return result;
}
module.exports = (points) => {
  let markers=[];
  if (points){
    points.forEach(marker=>{
      console.log(marker);
      if (marker.latitude && marker.longitude) {
        markers.push(getMarker(marker));
      }
    })
  }
  return {
    markers
  }
}