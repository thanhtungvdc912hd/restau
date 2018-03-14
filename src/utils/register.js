const URL = 'http://192.168.64.2/myrestau/register.php'

function register(email, name, password) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({email, name, password})
  })
  .then(res => res.text);
}

export default register;
