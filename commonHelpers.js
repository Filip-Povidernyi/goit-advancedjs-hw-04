import{a as w,i as a,S as $}from"./assets/vendor-427610a5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const E="https://pixabay.com/api/",k="40365251-7556fc461aeff4605ce69e2bc";async function f(s,r,o){const n=`${E}?key=${k}&q=${s}&page=${r}&per_page=${o}&image_type=photo&orientation=horizontal&safesearch=true`;return(await w.get(n)).data}const P={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},{searchForm:S,gallery:p,btnLoadMore:l}=P,d=40;let c=1,u="";l.classList.add("is-hidden");S.addEventListener("submit",H);function H(s){s.preventDefault(),p.innerHTML="",c=1;const{searchQuery:r}=s.currentTarget.elements;if(u=r.value.trim().toLowerCase().split(" ").join("+"),u===""){a.info({message:"Enter your request, please!",position:"center",timeout:4e3});return}f(u,c,d).then(o=>{const n=o.hits;console.log(n),o.totalHits===0?a.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"center",timeout:4e3}):(a.success({message:`Hooray! We found ${o.totalHits} images.`,position:"center",timeout:4e3}),h(n),L.refresh()),o.totalHits>d&&(l.classList.remove("is-hidden"),window.addEventListener("scroll",y))}).catch(g),l.addEventListener("click",m),s.currentTarget.reset()}function h(s){const r=s.map(({webformatURL:o,largeImageURL:n,tags:e,likes:t,views:i,comments:b,downloads:v})=>`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${n}">
                <img src="${o}" alt="${e}" width="300" loading="lazy" />
            </a>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b><span class="value-num">${t}</span>
            </p>
            <p class="info-item">
            <b>Views: </b><span class="value-num">${i}</span>
            </p>
            <p class="info-item">
            <b>Comments: </b><span class="value-num">${b}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${v}</span>
            </p>
        </div>
        </div>`);p.insertAdjacentHTML("beforeend",r.join(""))}function m(){c+=1,f(u,c,d).then(s=>{const r=s.hits,o=Math.ceil(s.totalHits/d);h(r),c===o&&(l.classList.add("is-hidden"),a.info({message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:4e3}),l.removeEventListener("click",m),window.removeEventListener("scroll",y)),L.refresh()}).catch(g)}function g(){a.error({message:"Oops! Something went wrong! Try reloading the page or make another choice!",position:"center",timeout:4e3})}function y(){M()&&m()}function M(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}let L=new $(".img_wrap a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
