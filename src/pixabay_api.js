import axios from "axios"; 

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40265694-60baf223b251f2954a37b9862';

const params = new URLSearchParams({
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    afesearch: true,
});

export async function fetchImages(q, page, perPage) {
        const url = `${BASE_URL}?${params}&q=${q}&page=${page}&per_page=${perPage}`;
        const resp = await axios.get(url);
        return resp.data
    
}