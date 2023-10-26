import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { fetchImages } from "./pixabay_api";


const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
}

const perPage = 40;
let page = 1;
let keyOfSearchPhoto = '';

refs.form.addEventListener('submit', onSearchImages);

function onSearchImages(evt) {

    evt.preventDefault(); 
    refs.gallery.innerHTML = '';
    page = 1;

     const { searchQuery } = evt.currentTarget.elements;
    keyOfSearchPhoto = searchQuery.value
        .trim()
        .toLowerCase()
        .split(' ')
        .join('+');
    
    if (keyOfSearchPhoto === '') {
        Notiflix.Notify.info('Enter your request, please!');
        return;
    } 

}

fetchImages(keyOfSearchPhoto, page, perPage)
    .then((data) => {
        const searchResults = data.hits;
     

         if (data.totalHits === 0) {
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
                // console.log(searchResults);
             creatMarkup(searchResults);
             
                lightbox.refresh();

            };
            if (data.totalHits > perPage) {
                btnLoadMore.classList.remove('is-hidden');
                window.addEventListener('scroll', showLoadMorePage);
            };
}
        
    // console.log(data)
  
    )
    .catch((err) => console.log(err));


function creatMarkup(arr) {
    const photos = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
        <a class="gallery-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>${likes}</b>
    </p>
    <p class="info-item">
      <b>${views}</b>
    </p>
    <p class="info-item">
      <b>${comments}</b>
    </p>
    <p class="info-item">
      <b>${downloads}</b>
    </p>
  </div>
</div>`
    }).join('');   
    refs.gallery.insertAdjacentHTML("beforeend", photos);
}

    








