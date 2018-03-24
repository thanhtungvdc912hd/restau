const URL = 'http://192.168.64.2/myrestau/change_info.php'

function changeInfo(token, name, tel, address, birthday) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({token, name, tel, address, birthday})
  })
  .then(res => res.json())
  .catch(err => console.log(err))
}

export default changeInfo;
