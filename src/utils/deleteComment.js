const URL = 'http://192.168.64.2/myrestau/delete_comment.php'

function deleteComment(commentId) {
  return fetch(URL,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({commentId})
  })
  .then(res => res.text());
}

export default deleteComment;
