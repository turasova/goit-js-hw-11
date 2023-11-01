import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from "notiflix";
import { fetchImages } from "./pixabay_api";
import { creatMarkup } from "./markup";



export const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
    btnUpToTop: document.querySelector('.go-top'),
}

const perPage = 40;
let page = 1;
let searchPhoto = '';


refs.form.addEventListener('submit', onSearchImages);

// function onSearchImages(evt) {

//   evt.preventDefault();
  
//     refs.gallery.innerHTML = '';
//     page = 1;
//   const { searchQuery } = evt.currentTarget.elements;
//   searchPhoto = searchQuery.value.trim()

//     if (searchPhoto === '') {
//         Notiflix.Notify.info('Enter your request, please!');
//         return;
//   }
//    fetchImages(searchPhoto, page, perPage)
//     .then((data) => {
//       const searchResults = data.hits;
      
//       if (data.totalHits === 0) {
//         refs.btnLoadMore.style.display = 'none';
//                 Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//             } else {
//                 Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
//                 console.log(searchResults);
//              creatMarkup(searchResults);
//                lightbox.refresh();

//             };
//       if (data.totalHits > perPage) {
//         refs.btnLoadMore.style.display = 'none';
//                  window.addEventListener('scroll', scrollBtnLoadMorePage);
//            };
// }
//     )
//     .catch(fetchError);

//   refs.btnLoadMore.addEventListener('click', onClickBtnLoadMore);
//   evt.currentTarget.reset();
// }

async function onSearchImages(evt) {
  evt.preventDefault();
  refs.gallery.innerHTML = '';
  page = 1;
  const { searchQuery } = evt.currentTarget.elements;
  searchPhoto = searchQuery.value.trim()
  if (searchPhoto === '') {
    Notiflix.Notify.info('Enter your request, please!');
    return;
  }

  const getImages = await fetchImages(searchPhoto, page, perPage);
  console.log(getImages);
  try {
    const searchResults = getImages.hits;
    if (getImages.totalHits === 0) {
      refs.btnLoadMore.style.display = 'none'; 
       Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      Notiflix.Notify.info(`Hooray! We found ${getImages.totalHits} images.`);
      creatMarkup(searchResults);
      lightbox.refresh(); 
    }
    if (getImages.totalHits > perPage) {
      refs.btnLoadMore.style.display = 'none';
      window.addEventListener('scroll', scrollBtnLoadMorePage);
    }
    refs.btnLoadMore.addEventListener('click', onClickBtnLoadMore);
   evt.currentTarget.reset();

  } catch (error) {
    fetchError;
  }
  
}




// function onClickBtnLoadMore(evt) {
//   console.log(evt);
//   page += 1;
  
//   fetchImages(searchPhoto, page, perPage)
//     .then(data => {
  
//       const searchResults = data.hits;
//       const numberPage = Math.ceil(data.totalHits / perPage);

//       creatMarkup(searchResults);

//       smoothScroll();
//       console.log(page);
//      console.log(numberPage);

//       spy щоб прийшло 5 сторінок
 
//       if (page === numberPage) {

//         refs.btnLoadMore.style.display = 'none';
        
//         Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
//         refs.btnLoadMore.removeEventListener('click', onClickBtnLoadMore);
//          window.removeEventListener('scroll', scrollBtnLoadMorePage);
//       }
//       lightbox.refresh();
//     })
//     .catch(fetchError);
// }


async function onClickBtnLoadMore(evt) {
  console.log(evt);
  page += 1;
  const getImages = await fetchImages(searchPhoto, page, perPage);
  try {
    const searchResults = getImages.hits;
    const numberPage = Math.ceil(getImages.totalHits / perPage);
    creatMarkup(searchResults);
    smoothScroll();
    if (page === numberPage) {
      refs.btnLoadMore.style.display = 'none';
      Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.")
      refs.btnLoadMore.removeEventListener('click', onClickBtnLoadMore);
      window.removeEventListener('scroll', scrollBtnLoadMorePage);
    }
   lightbox.refresh(); 
  } catch (error) {
    fetchError;
  }
  
}


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 300,
})


function smoothScroll() {
  
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });

}

function scrollBtnLoadMorePage() {
  if (nextPage()) {
   onClickBtnLoadMore();
  }
}

function nextPage() {
  return (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  );
}



function fetchError() {
Notiflix.Report.failure(
  'Error',
  'Oops! Something went wrong! Try reloading the page!',
  'OK',
  {
    width: '360px',
    svgSize: '120px',
  },
);
}
  

refs.btnUpToTop.addEventListener('click', onGoTop);
window.addEventListener('scroll', onTrackScroll);

function onTrackScroll() {
  const offset = window.scrollY;
  const coords = document.documentElement.clientHeight;
  if (offset > coords) {
    refs.btnUpToTop.classList.add('go-top--show');

  } else {
    refs.btnUpToTop.classList.remove('go-top--show');
  }
  
}

function onGoTop() {
  if (window.scrollY > 0) {
    window.scrollBy(0, -55);
    setTimeout(onGoTop, 0)
  }
}
