import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createMarkup } from './markup';
import { fetchImages } from './service';

let page = 1;
let query = '';
let totalHits;

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const btnSubmit = document.querySelector('.submit');

searchForm.addEventListener('submit', handlerSubmit);
loadMoreBtn.addEventListener('click', handlerClickMore);

loadMoreBtn.classList.add('is-hidden');

async function handlerClickMore() {
  page += 1;
  const data = await fetchImages(query, page);
  gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
  modal.refresh();
  checkLoadMore();
  scroll();
}

async function handlerSubmit(evt) {
  evt.preventDefault();
  query = evt.currentTarget.searchQuery.value;
  gallery.innerHTML = '';
  page = 1;
  loadMoreBtn.classList.add('is-hidden');
  try {
    const data = await fetchImages(query, page);
    totalHits = data.data.totalHits;
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits));
    modal.refresh();
  } catch (error) {
    console.log(error);
    Notiflix.Report.failure(
      'Oops!',
      'Something went wrong! Try reloading the page!',
      'Ok'
    );
  } finally {
    if (!totalHits) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      loadMoreBtn.classList.remove('is-hidden');
    }
  }
  checkLoadMore();
}

function checkLoadMore() {
  if (totalHits / 40 < page && totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

const modal = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  navText: ['◀', '▶'],
  closeText: '✖',
});

function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}