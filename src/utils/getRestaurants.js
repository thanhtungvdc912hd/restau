const URL = 'http://192.168.64.2/myrestau/restaurants.php'

function getRestaurants(restaurantIds, isTop) {
  return fetch(URL + "?ids=[" + restaurantIds + "]&isTop=" + isTop)
  .then(res => res.json())
  .then(resJSON => resJSON);
}

export default getRestaurants;
