import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPhoto } from "./pixabay";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const elems = {
    searchForm: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
};

const body = document.querySelector('body');
let imageUrl = [];
function bodyBG(imageUrl) {

    if (imageUrl) {
        body.style.backgroundColor = 'transparent';
        body.style.backgroundImage = `url(${imageUrl[0]})`;
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';
    };
};



const { searchForm, gallery, btnLoadMore } = elems;


const perPage = 40;
let page = 1;
let keyOfSearchPhoto = '';

btnLoadMore.style.display = 'none';

searchForm.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
    event.preventDefault();

    gallery.innerHTML = '';
    page = 1;
    const { searchQuery } = event.currentTarget.elements;
    imageUrl = [];
    keyOfSearchPhoto = searchQuery.value
        .trim()
        .toLowerCase()
        .split(' ')
        .join('+');

    if (keyOfSearchPhoto === '') {
        btnLoadMore.classList.add('is-hidden');
        body.style.backgroundColor = '#fff';
        body.style.backgroundImage = 'none';
        iziToast.info({
            message: 'Enter your request, please!',
            position: 'center',
            timeout: 4000,
        });
        return;
    }

    fetchPhoto(keyOfSearchPhoto, page, perPage)
        .then(data => {
            const searchResults = data.hits;
            if (data.totalHits === 0) {
                btnLoadMore.classList.add('is-hidden');
                body.style.backgroundColor = '#fff';
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again.',
                    position: 'center',
                    timeout: 4000,
                });
            } else {
                btnLoadMore.classList.add('is-hidden');
                body.style.backgroundColor = '#fff';
                iziToast.success({
                    message: `Hooray! We found ${data.totalHits} images.`,
                    position: 'center',
                    timeout: 4000,
                });
                createMarkup(searchResults);
                lightbox.refresh();
            };
            if (data.totalHits > perPage) {
                btnLoadMore.classList.remove('is-hidden');
                window.addEventListener('scroll', showLoadMorePage);
            };
        })
        .catch(onFetchError);

    btnLoadMore.addEventListener('click', onClickLoadMore);

    event.currentTarget.reset();
};

function createMarkup(searchResults) {
    const arrPhotos = searchResults.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        imageUrl.push(largeImageURL);
        return `<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${largeImageURL}">
                <img class="img" src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
            </a>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b><span class="value-num">${likes}</span>
            </p>
            <p class="info-item">
            <b>Views: </b><span class="value-num">${views}</span>
            </p>
            <p class="info-item">
            <b>Comments: </b><span class="value-num">${comments}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${downloads}</span>
            </p>
        </div>
        </div>`
    });
    gallery.insertAdjacentHTML("beforeend", arrPhotos.join(''));
    bodyBG(imageUrl);
};

function onClickLoadMore() {
    page += 1;
    fetchPhoto(keyOfSearchPhoto, page, perPage)
        .then(data => {
            const searchResults = data.hits;
            const numberOfPage = Math.ceil(data.totalHits / perPage);

            createMarkup(searchResults);
            if (page === numberOfPage) {
                btnLoadMore.classList.add('is-hidden');
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'center',
                    timeout: 4000,
                });
                btnLoadMore.removeEventListener('click', onClickLoadMore);
                window.removeEventListener('scroll', showLoadMorePage);
            };
            lightbox.refresh();
            // scrollPage();
        })
        .catch(onFetchError);
};

function onFetchError() {
    btnLoadMore.classList.add('is-hidden');
    body.style.backgroundColor = '#fff';
    iziToast.error({
        message: 'Oops! Something went wrong! Try reloading the page or make another choice!',
        position: 'center',
        timeout: 4000,
    });
};

// function scrollPage() {
//     const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

//     window.scrollBy({
//         top: cardHeight * 2,
//         behavior: "smooth",
//     });
// };

function showLoadMorePage() {
    if (checkIfEndOfPage()) {
        onClickLoadMore();
    };
};

function checkIfEndOfPage() {
    return (
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
    );
}

let lightbox = new SimpleLightbox('.img_wrap a', {
    captionsData: 'alt',
    captionDelay: 250,
});