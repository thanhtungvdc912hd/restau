const URL = 'http://192.168.64.2/myrestau/order_history.php'

function getOrderHistory(token) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({token})
  })
  .then(res => res.json());
}

export default getOrderHistory;
