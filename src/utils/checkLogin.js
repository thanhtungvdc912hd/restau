const URL = 'http://192.168.64.2/myrestau/check_login.php'

function checkLogin(token) {
  console.log(token);
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({token})
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export default checkLogin;
