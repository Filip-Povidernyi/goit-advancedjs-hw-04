import axios from 'axios';
export { fetchPixabayPhoto };

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "40365251-7556fc461aeff4605ce69e2bc";

async function fetchPixabayPhoto(q, page, perPage) {

    const url = `?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const { data } = await axios.get(url);

    return data;
};