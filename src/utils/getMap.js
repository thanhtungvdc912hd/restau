const URL = 'https://maps.googleapis.com/maps/api/geocode/json?address='
//https://maps.googleapis.com/maps/api/geocode/json?address=33 Đặng Huyền Thông, Hải Dương&key=AIzaSyBncoLUASeOHyghF3sWjUPexD03lULoB74
function getMap(address) {
  return fetch(URL + address + '&key=AIzaSyBncoLUASeOHyghF3sWjUPexD03lULoB74')
  .then(res => res.json())
  .then(resJSON => resJSON);
}

export default getMap;
