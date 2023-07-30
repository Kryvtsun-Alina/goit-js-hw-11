import axios from 'axios';
const url = 'https://pixabay.com/api/';

const PARAMS = new URLSearchParams({
  key: '37592708-0adc1a438205c0fc7ad44213d',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
});

async function fetchImages(q, page) {
  const resp = await axios.get(`${url}?${PARAMS}&q="${q}"&page=${page}`);
  return resp;
}

export { fetchImages };