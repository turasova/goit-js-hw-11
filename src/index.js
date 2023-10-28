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
let searchPhoto = '';

refs.form.addEventListener('submit', onSearchImages);

function onSearchImages(evt) {

  evt.preventDefault(); 
  
    refs.gallery.innerHTML = '';
    page = 1;

     const { searchQuery } = evt.currentTarget.elements;
  
  searchPhoto = searchQuery.value
    
    if (searchPhoto === '') {
        Notiflix.Notify.info('Enter your request, please!');
        return;
  } 
  
fetchImages(searchPhoto, page, perPage)
    .then((data) => {
        const searchResults = data.hits;
      refs.btnLoadMore.style.display = 'block';

      if (data.totalHits === 0) {
        refs.btnLoadMore.style.display = 'none';
                Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            } else {
                Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
                // console.log(searchResults);
             creatMarkup(searchResults);
             
               lightbox.refresh();

            };
            // if (data.totalHits > perPage) {
                
            //     window.addEventListener('scroll', showBtnLoadMorePage);
            // };
}
        
    // console.log(data)
  
    )
    .catch((err) => console.log(err));

  refs.btnLoadMore.addEventListener('click', onClickBtnLoadMore);

  evt.target.reset();


}

function onClickBtnLoadMore(evt) {
  console.log(evt);
  page += 1;
  
  fetchImages(searchPhoto, page, perPage)
    .then(data => {
      const searchResults = data.hits;
      const numberPage = Math.ceil(data.totalHits / perPage);
      creatMarkup(searchResults);

      if (page === numberPage) {
       
        Notiflix.Notify("We're sorry, but you've reached the end of search results.")
      }
      lightbox.refresh();
    })
    .catch(err => console.log(err));
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
})

// function showBtnLoadMorePage() {
//   if (nextPage()) {
//     onClickBtnLoadMore();
//   }
// }

// function nextPage() {
//   return (window.innerHeight >= document.documentElement.scrollHeight);
// }

function creatMarkup(arr) {
    const photos = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `<div class="photo-card">
        <div class="images-card">
        <a class="gallery-link" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
  </a>
  </div>
  <div class="info">
    <p class="info-item">
      <b>Likes<br />${likes}</b>
    </p>
    <p class="info-item">
      <b>Views<br />${views}</b>
    </p>
    <p class="info-item">
      <b>Comments<br />${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br />${downloads}</b>
    </p>
  </div>
</div>`
    }).join('');   
    refs.gallery.insertAdjacentHTML("beforeend", photos);
}

// function fetchError() {
    

// Notiflix.Report.failure(
//   'Error',
//   'Oops! Something went wrong! Try reloading the page or select another cat breed!',
//   'OK',
//   {
//     width: '360px',
//     svgSize: '120px',
//   },
// );
// }
    








