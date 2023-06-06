import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const KEY = '34667296-fe4db44c106503806ff969e6a';

const fetchImages = async (searchQuery, page) => {
  const response = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12
  `
  );
  return response.data;
};

export default fetchImages;
