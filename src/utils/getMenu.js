function getMenu(restaurantId, page) {
  const URL = `http://192.168.64.2/myrestau/food_by_restaurant.php?restaurantId=${restaurantId}&page=${page}`
  return fetch(URL)
  .then(res => res.json())
  .then(resJSON => resJSON);
}

export default getMenu;
