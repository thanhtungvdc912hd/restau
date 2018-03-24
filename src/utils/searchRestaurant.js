function searchRestaurant(keyword) {
  const URL = `http://192.168.64.2/myrestau/search.php?key=${keyword}`
  return fetch(URL)
  .then(res => res.json())
  .then(resJSON => resJSON);
}

export default searchRestaurant;
