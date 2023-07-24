import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let totalImages = 0;
let isLoadMoreVisible = false;

async function searchImages(query) {
  const API_KEY = '38444192-c22b2b9bf5aaeec869e6fd89a';
  const url = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`;

  try {
    const response = await axios.get(url);
    const data = response.data;
    return data.hits;
  } catch (error) {
    console.log('Error fetching images:', error);
    return [];
  }
}

function displayImages(images) {
  const galleryMarkup = images
    .map(
      (image) => `
        <a href="${image.largeImageURL}" class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${image.likes}</p>
            <p class="info-item"><b>Views:</b> ${image.views}</p>
            <p class="info-item"><b>Comments:</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </a>
      `
    )
    .join('');

  gallery.innerHTML = galleryMarkup;

  const lightbox = new SimpleLightbox('.gallery a', {});
}

async function handleSearch(event) {
  event.preventDefault();
  const searchQuery = event.target.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.failure('Please enter a search query.');
    return;
  }

  page = 1;
  isLoadMoreVisible = false;

  const images = await searchImages(searchQuery);

  if (images.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  } else {
    displayImages(images);
    Notiflix.Notify.success(`Found ${images.length} images.`);
    isLoadMoreVisible = true;
    loadMoreBtn.classList.remove('is-hidden');
  }
}

searchForm.addEventListener('submit', handleSearch);

async function loadMoreImages() {
  page += 1;
  const searchQuery = searchForm.elements.searchQuery.value.trim();
  const images = await searchImages(searchQuery);

  if (images.length === 0) {
    Notiflix.Notify.failure('No more images available.');
  } else {
    displayImages(images);
  }

  if (page * 40 >= totalImages) {
    isLoadMoreVisible = false;
    loadMoreBtn.classList.add('is-hidden');
  } else {
    isLoadMoreVisible = true;
    loadMoreBtn.classList.remove('is-hidden');
  }
}

loadMoreBtn.addEventListener('click', loadMoreImages);

function isScrolledToBottom() {
  const galleryRect = gallery.getBoundingClientRect();
  return window.innerHeight >= galleryRect.bottom;
}

function handleScroll() {
  if (isScrolledToBottom() && !isLoadMoreVisible) {
    loadMoreBtn.classList.remove('is-hidden');
  }
}

window.addEventListener('scroll', handleScroll);