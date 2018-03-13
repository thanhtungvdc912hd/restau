const URL = 'http://192.168.64.2/myrestau/restaurant_detail.php?id='

function getRestaurantDetail(restaurantId) {
  return fetch(URL + restaurantId)
  .then(res => res.json())
  .then(resJSON => resJSON);
}

export default getRestaurantDetail;
