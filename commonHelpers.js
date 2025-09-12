import{a as u,i as l,S as y}from"./assets/vendor-951421c8.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();u.defaults.baseURL="https://pixabay.com/api/";const L="40365251-7556fc461aeff4605ce69e2bc",p=async(a,s=1,o=40)=>{const r=`?key=${L}&q=${a}&page=${s}&per_page=${o}&image_type=photo&orientation=horizontal&safesearch=true`;return(await u.get(r)).data},g=document.querySelector(".search-form"),c=document.querySelector(".gallery"),i=document.querySelector(".load-more");let d=1,m=40;c.innerHTML="";i.classList.add("is-hidden");g.addEventListener("submit",async a=>{a.preventDefault(),d=1;const s=a.currentTarget.elements.searchQuery.value;try{const o=await p(s.trim().toLowerCase(),d,m);if(o.total===0){i.classList.add("is-hidden"),c.innerHTML="",l.info({message:"For your request, no images were found. Please try again.",position:"topRight",timeout:4e3});return}l.info({message:`Hooray! We found ${o.total} images.`,position:"topRight",timeout:4e3}),c.innerHTML=h(o.hits).join(""),new y(".img_wrap a",{captionsData:"alt",captionDelay:250}).on("show.simplelightbox",()=>{const n=document.querySelector("img.img-high");n.style.maxHeight="100vh"});let e=Math.floor(Math.random()*(o.hits.length-1));const t=o.hits[e].largeImageURL;document.body.style.backgroundImage=`url(${t})`,o.total>40?i.classList.remove("is-hidden"):i.classList.add("is-hidden")}catch(o){l.error({message:`Oops! Something went wrong! ${o} Try reloading the page or make another choice!`,position:"topRight",timeout:4e3}),c.innerHTML="",i.classList.add("is-hidden")}});const h=a=>a.map(({webformatURL:s,tags:o,largeImageURL:r,likes:e,views:t,comments:n,downloads:f})=>`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${r}">
                <img class="img img-high" src="${s}" alt="${o}" width="300" loading="lazy" />
            </a>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b><span class="value-num">${e}</span>
            </p>
            <p class="info-item">
            <b>Views: </b><span class="value-num">${t}</span>
            </p>
            <p class="info-item">
            <b>Comments: </b><span class="value-num">${n}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${f}</span>
            </p>
        </div>
        </div>`);i.addEventListener("click",async()=>{const a=g.elements.searchQuery.value;d+=1;try{const s=await p(a.trim().toLowerCase(),d,m);c.insertAdjacentHTML("beforeend",h(s.hits).join("")),lightbox.refresh(),d>=Math.ceil(s.totalHits/m)&&(i.classList.add("is-hidden"),l.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3}))}catch(s){l.error({message:`Oops! Something went wrong! ${s} Try reloading the page or make another choice!`,position:"topRight",timeout:4e3}),i.classList.add("is-hidden")}});
//# sourceMappingURL=commonHelpers.js.map
