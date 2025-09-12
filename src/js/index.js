import iziToast from 'izitoast';
import "izitoast/dist/css/iziToast.min.css";
import { getPhotos } from './pixabay';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const btnLoadMore = document.querySelector('.load-more');
let currentPage = 1;
let per_page = 40;
gallery.innerHTML = '';

btnLoadMore.classList.add('is-hidden');

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    currentPage = 1;
    const query = evt.currentTarget.elements.searchQuery.value;
    try {

        const data = await getPhotos(query.trim().toLowerCase(), currentPage, per_page);
        console.log('data', data)

        if (data.total === 0) {
            btnLoadMore.classList.add('is-hidden');
            gallery.innerHTML = '';
            iziToast.info({
                message: 'For your request, no images were found. Please try again.',
                position: 'topRight',
                timeout: 4000,
            })
            return;
        };
        iziToast.info({
            message: `Hooray! We found ${data.total} images.`,
            position: 'topRight',
            timeout: 4000,
        });

        gallery.innerHTML = markUp(data.hits).join('');
        let idx = Math.floor(Math.random() * (data.hits.length - 1));
        const bgImage = data.hits[idx].largeImageURL;
        document.body.style.backgroundImage = `url(${bgImage})`;
        if (data.total > 40) {
            btnLoadMore.classList.remove('is-hidden');
        } else {
            btnLoadMore.classList.add('is-hidden');
        };
    } catch (error) {
        iziToast.error({
            message: `Oops! Something went wrong! ${error} Try reloading the page or make another choice!`,
            position: 'topRight',
            timeout: 4000,
        });
        gallery.innerHTML = '';
        btnLoadMore.classList.add('is-hidden');
    }
});

const markUp = (data) => {
    return data.map(({ webformatURL, tags, largeImageURL, likes, views, comments, downloads }) => {
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
};

btnLoadMore.addEventListener('click', async () => {
    const query = form.elements.searchQuery.value;
    currentPage += 1;
    try {
        const data = await getPhotos(query.trim().toLowerCase(), currentPage, per_page);
        gallery.insertAdjacentHTML('beforeend', markUp(data.hits).join(''));
        if (currentPage >= Math.ceil(data.totalHits / per_page)) {
            btnLoadMore.classList.add('is-hidden');
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                timeout: 4000,
            });
        }
    }
    catch (error) {
        iziToast.error({
            message: `Oops! Something went wrong! ${error} Try reloading the page or make another choice!`,
            position: 'topRight',
            timeout: 4000,
        });
        btnLoadMore.classList.add('is-hidden');
    }
});




























































































































































































































































































































// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import { fetchPixabayPhoto } from "./pixabay";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";


// const elems = {
//     form: document.querySelector('.search-form'),
//     gallery: document.querySelector('.gallery'),
//     btnLoadMore: document.querySelector('.load-more'),
// };

// const body = document.querySelector('body');
// let imageUrl = [];
// function bodyBG(imageUrl) {

//     if (imageUrl) {
//         let n = (imageUrl.length - 1);
//         let idx = Math.floor(Math.random() * n);
//         body.style.backgroundColor = 'transparent';
//         body.style.backgroundImage = `url(${imageUrl[idx]})`;
//         body.style.backgroundRepeat = 'no-repeat';
//         body.style.backgroundAttachment = 'fixed';
//     };
// };



// const { form, gallery, btnLoadMore } = elems;


// const perPage = 40;
// let page = 1;
// let keyOfSearchPhoto = '';
// let isLoading = false;



// btnLoadMore.style.display = 'none';

// form.addEventListener('submit', onSubmitForm);

// async function onSubmitForm(event) {
//     event.preventDefault();
//     const { searchQuery } = event.currentTarget.elements;
//     imageUrl = [];
//     let newKeyOfSearchPhoto = searchQuery.value
//         .trim()
//         .toLowerCase()
//         .split(' ')
//         .join('+');

//     if (newKeyOfSearchPhoto === '') {
//         // btnLoadMore.classList.add('is-hidden');
//         body.style.backgroundColor = '#fff';
//         body.style.backgroundImage = 'none';
//         iziToast.info({
//             message: 'Enter your request, please!',
//             position: 'center',
//             timeout: 4000,
//         });
//         gallery.innerHTML = '';
//         return;
//     };
//     if (newKeyOfSearchPhoto === keyOfSearchPhoto) {
//         iziToast.info({
//             title: 'Info',
//             message: `The previous ${newKeyOfSearchPhoto} request has already been received, please enter a new search parameter.`,
//             position: 'topRight',
//             color: 'blue',
//         });
//         event.currentTarget.reset();

//         return;
//     }
//     if (newKeyOfSearchPhoto !== keyOfSearchPhoto) {
//         window.removeEventListener('scroll', showLoadMorePage)
//     };
//     keyOfSearchPhoto = newKeyOfSearchPhoto;
//     page = 1;
//     gallery.innerHTML = '';
//     event.currentTarget.reset();

//     try {

//         const { hits, total } = await fetchPixabayPhoto(keyOfSearchPhoto, page, perPage);

//         if (total === 0) {
//             // btnLoadMore.classList.add('is-hidden');
//             body.style.backgroundColor = '#fff';
//             iziToast.error({
//                 message: 'Sorry, there are no images matching your search query. Please try again.',
//                 position: 'center',
//                 timeout: 4000,
//             });
//             return;
//         };
//         // btnLoadMore.classList.add('is-hidden');
//         body.style.backgroundColor = '#fff';
//         if (total <= perPage) {
//             iziToast.success({
//                 message: `Hooray! We found ${total} images. But it's only 1 page`,
//                 position: 'center',
//                 timeout: 4000,
//             });
//             window.removeEventListener('scroll', showLoadMorePage);
//         } else {
//             iziToast.success({
//                 message: `Hooray! We found ${total} images.`,
//                 position: 'center',
//                 timeout: 4000,
//             });
//             window.addEventListener('scroll', showLoadMorePage);
//         };
//         createMarkup(hits);
//         bodyBG(imageUrl);
//         lightbox.refresh();
//     } catch (error) {
//         onFetchError(error.message);
//     };
// };

// function createMarkup(searchResults) {
//     const arrPhotos = searchResults.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
//         imageUrl.push(largeImageURL);
//         return `<div class="photo-card">
//         <div class="img_wrap">
//             <a class="gallery_link" href="${largeImageURL}">
//                 <img class="img" src="${webformatURL}" alt="${tags}" width="300" loading="lazy" />
//             </a>
//         </div>
//         <div class="info">
//             <p class="info-item">
//             <b>Likes: </b><span class="value-num">${likes}</span>
//             </p>
//             <p class="info-item">
//             <b>Views: </b><span class="value-num">${views}</span>
//             </p>
//             <p class="info-item">
//             <b>Comments: </b><span class="value-num">${comments}</span>
//             </p>
//             <p class="info-item">
//             <b>Downloads: </b><span class="value-num">${downloads}</span>
//             </p>
//         </div>
//         </div>`
//     });
//     gallery.insertAdjacentHTML("beforeend", arrPhotos.join(''));
// };

// async function onClickLoadMore() {
//     if (checkIfEndOfPage() && !isLoading) {
//         page += 1;
//         // lightbox.refresh();

//         try {

//             isLoading = true;
//             const { hits, totalHits } = await fetchPixabayPhoto(keyOfSearchPhoto, page, perPage);
//             const numberOfPage = Math.ceil(totalHits / perPage);
//             createMarkup(hits);
//             lightbox.refresh();

//             if (page === numberOfPage) {
//                 // btnLoadMore.classList.add('is-hidden');
//                 iziToast.info({
//                     message: "We're sorry, but you've reached the end of search results.",
//                     position: 'center',
//                     timeout: 4000,
//                 });
//                 // btnLoadMore.removeEventListener('click', onClickLoadMore);
//                 window.removeEventListener('scroll', showLoadMorePage);
//             };
//         } catch (error) {
//             onFetchError(error.message);
//         } finally {
//             isLoading = false;
//         };

//     };
// };

// function onFetchError(error) {
//     // btnLoadMore.classList.add('is-hidden');
//     body.style.backgroundColor = '#fff';
//     iziToast.error({
//         message: `Oops! Something went wrong! ${error} Try reloading the page or make another choice!`,
//         position: 'center',
//         timeout: 4000,
//     });
// };

// // function scrollPage() {
// //     const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();

// //     window.scrollBy({
// //         top: cardHeight * 2,
// //         behavior: "smooth",
// //     });
// // };

// function showLoadMorePage() {
//     onClickLoadMore();
// };

// function checkIfEndOfPage() {
//     return (
//         window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
//     );
// }

// let lightbox = new SimpleLightbox('.img_wrap a', {
//     captionsData: 'alt',
//     captionDelay: 250,
// });