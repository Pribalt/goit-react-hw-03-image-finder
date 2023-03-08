import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32953111-1e0841424fa9175caa9620a35';

export const getImages = async (textSearch, page, perPage) => {
  const response = await axios.get(
    `${BASE_URL}?q=${textSearch}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );

  return response.data;
};
