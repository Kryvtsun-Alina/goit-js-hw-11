function createMarkup(array) {
  return array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a class="photo-link" href="${largeImageURL}">
        <div class="thumb">
        <img class="photo-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </div>
      <div class="info">
        <p class="info-item">
          <b>Likes</b><span>${likes}</span>
        </p>
        <p class="info-item">
          <b>Views</b><span>${views}</span>
        </p>
        <p class="info-item">
          <b>Comments</b><span>${comments}</span>
        </p>
        <p class="info-item">
          <b>Downloads</b><span>${downloads}</span>
        </p>
      </div>
      </a>
    </div>`;
      }
    )
    .join('');
}

export { createMarkup };