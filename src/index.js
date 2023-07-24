import axios from 'axios';
import Notiflix from 'notiflix';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;

async function searchImages(query) {
    const API_KEY = '38444192-c22b2b9bf5aaeec869e6fd89a';
    const url = 'https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40';

    try {
       const responce = await axios.get(url);
       const data = responce.data;
       return data.hits;
    }catch(error){
        console.log('Error fetching images:', error);
        return [];
    }
};

function displayImages(images) {
    const galleryMarkup = images
      .map(
        (image) => `
        <div class="photo-card">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item"><b>Likes:</b> ${image.likes}</p>
            <p class="info-item"><b>Views:</b> ${image.views}</p>
            <p class="info-item"><b>Comments:</b> ${image.comments}</p>
            <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
          </div>
        </div>
      `
      )
      .join('');
  
    gallery.innerHTML = galleryMarkup;
  };

  async function handleSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.searchQuery.value.trim();
  
    if (searchQuery === '') {
      Notiflix.Notify.failure('Please enter a search query.');
      return;
    }
  
    page = 1;

    const images = await searchImages(searchQuery);
  
    if (images.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      displayImages(images);
      Notiflix.Notify.success(`Found ${images.length} images.`);
      loadMoreBtn.classList.remove('visually-hidden');
    }
  };

  async function handleSearch(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.searchQuery.value.trim();
  
    if (searchQuery === '') {
      Notiflix.Notify.failure('Please enter a search query.');
      return;
    }
  
    page = 1; // Скидаємо сторінку при новому пошуковому запиті
  
    const images = await searchImages(searchQuery);
  
    if (images.length === 0) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
      displayImages(images);
      Notiflix.Notify.success(`Found ${images.length} images.`);
      loadMoreBtn.classList.remove('visually-hidden');
    }
  }