import axios from "axios"; 

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40265694-60baf223b251f2954a37b9862';

// const params = new URLSearchParams({
//     key: API_KEY,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     afesearch: true,
//     q: 'all images',
// });

// export function fetchImages(page = 1) {
 
//     return fetch(`https://pixabay.com/api/?key=40265694-60baf223b251f2954a37b9862&q=&image_type=photo&orientation=horizontal&safesearch=true`)
//         .then(resp => {
//           console.log(resp);
//         if (!resp.ok) {
//             throw new Error(resp.statusText || 'Примусово прокидаємо в catch');
//             }
//             return resp.json()

//         })
    
// }

export async function fetchImages(q, page, perPage) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${q}&page=${page}&per_page=${perPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    const resp = await axios.get(url);
    return resp.data;
}