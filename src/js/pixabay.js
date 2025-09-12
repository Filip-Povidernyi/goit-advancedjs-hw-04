import axios from 'axios';


axios.defaults.baseURL = "https://pixabay.com/api/";
const API_KEY = '40365251-7556fc461aeff4605ce69e2bc';

export const getPhotos = async (q, page = 1, per_page = 40) => {
    const reqUrl = `?key=${API_KEY}&q=${q}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(reqUrl);
    return response.data;
};