import saveToken from './saveToken'

const URL = 'http://192.168.64.2/myrestau/refresh_token.php'

function refreshToken(token) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({token})
  })
  .then(res => res.text())
  .then(tokentToSave => saveToken(tokentToSave))
  .catch(err => console.log(err))
}

export default refreshToken;
