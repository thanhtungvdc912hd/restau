const URL = 'http://192.168.64.2/myrestau/login.php'

function login(email, password) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(res => res.json());
}

export default login;
