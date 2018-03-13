const URL = 'http://192.168.64.2/myrestau/index.php'

function getRestaurants() {
  return fetch(URL)
  .then(res => res.json())
  .then(resJSON => resJSON);
}

export default getRestaurants;
