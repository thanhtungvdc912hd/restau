const URL = 'http://192.168.64.2/myrestau/cart.php'

function sendOrder(token, orderDetail) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({token, orderDetail})
  })
  .then(res => res.text());
}

export default sendOrder;
