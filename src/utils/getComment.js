function getComment(imageId) {
  const URL = `http://192.168.64.2/myrestau/image_detail.php?id=${imageId}`
  return fetch(URL)
  .then(res => res.json())
  .then(resJSON => resJSON);
}

export default getComment;
