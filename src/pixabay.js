import axios from 'axios';

const URL = "https://pixabay.com/api/";
const KEY = "40365251-7556fc461aeff4605ce69e2bc";

export async function fetchPhoto(q, page, perPage) {
    const url = `${URL}?key=${KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response.data;
};