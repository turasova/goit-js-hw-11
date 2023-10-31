export function creatMarkup(arr) {
    const photos = arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
      return `
       <a class="gallery-link" href="${largeImageURL}">
      <div class="photo-card">
        <div class="images-card">   
  <img src="${webformatURL}" alt="${tags}" class="photo" loading="lazy"/>
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
</div>
  </a>`
    }).join('');   
    refs.gallery.insertAdjacentHTML("beforeend", photos);
}
