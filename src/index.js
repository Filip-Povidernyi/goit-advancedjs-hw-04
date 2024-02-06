import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchPixabayPhoto } from "./pixabay";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const elems = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
};

const body = document.querySelector('body');
let imageUrl = [];
function bodyBG(imageUrl) {

    if (imageUrl) {
        let n = (imageUrl.length - 1);
        let idx = Math.floor(Math.random() * n);
        body.style.backgroundColor = 'transparent';
        body.style.backgroundImage = `url(${imageUrl[idx]})`;
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundAttachment = 'fixed';
    };
};



const { form, gallery, btnLoadMore } = elems;


const perPage = 40;
let page = 1;
let keyOfSearchPhoto = '';
let isLoading = false;



btnLoadMore.style.display = 'none';

form.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
    event.preventDefault();
    const { searchQuery } = event.currentTarget.elements;
    imageUrl = [];
    keyOfSearchPhoto = searchQuery.value
        .trim()
        .toLowerCase()
        .split(' ')
        .join('+');

    if (keyOfSearchPhoto === '') {
        // btnLoadMore.classList.add('is-hidden');
        body.style.backgroundColor = '#fff';
        body.style.backgroundImage = 'none';
        iziToast.info({
            message: 'Enter your request, please!',
            position: 'center',
            timeout: 4000,
        });
        return;
    }
    page = 1;
    gallery.innerHTML = '';
    event.currentTarget.reset();
    window.removeEventListener('scroll', showLoadMorePage);

    try {

        const { hits, total } = await fetchPixabayPhoto(keyOfSearchPhoto, page, perPage);

        if (total === 0) {
            // btnLoadMore.classList.add('is-hidden');
            body.style.backgroundColor = '#fff';
            iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again.',
                position: 'center',
                timeout: 4000,
            });
            return;
        };
        // btnLoadMore.classList.add('is-hidden');
        body.style.backgroundColor = '#fff';
        if (total <= perPage) {
            iziToast.success({
                message: `Hooray! We found ${total} images. But it's only 1 page`,
                position: 'center',
                timeout: 4000,
            });
        } else {
            iziToast.success({
                message: `Hooray! We found ${total} images.`,
                position: 'center',
                timeout: 4000,
            });
            window.addEventListener('scroll', showLoadMorePage);
        };
        createMarkup(hits);
        bodyBG(imageUrl);
        lightbox.refresh();
    } catch (error) {
        onFetchError(error.message);
    };
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
};

async function onClickLoadMore() {
    if (checkIfEndOfPage() && !isLoading) {
        page += 1;
        lightbox.refresh();

        try {

            isLoading = true;
            const { hits, totalHits } = await fetchPixabayPhoto(keyOfSearchPhoto, page, perPage);
            const numberOfPage = Math.ceil(totalHits / perPage);
            createMarkup(hits);

            if (page === numberOfPage && !isLoading) {
                // btnLoadMore.classList.add('is-hidden');
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'center',
                    timeout: 4000,
                });
                // btnLoadMore.removeEventListener('click', onClickLoadMore);
                window.removeEventListener('scroll', showLoadMorePage);
            };
        } catch (error) {
            onFetchError(error.message);
        } finally {
            isLoading = false;
        };

    };
};

function onFetchError(error) {
    // btnLoadMore.classList.add('is-hidden');
    body.style.backgroundColor = '#fff';
    iziToast.error({
        message: `Oops! Something went wrong! ${error} Try reloading the page or make another choice!`,
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
    onClickLoadMore();
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