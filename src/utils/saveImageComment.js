const URL = 'http://192.168.64.2/myrestau/save_image_comment.php'

function saveImageComment(token, imageId, description, date) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({token, imageId, description, date})
  })
  .then(res => res.text());
}

export default saveImageComment;
