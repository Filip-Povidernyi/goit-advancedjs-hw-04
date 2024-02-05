import{a as p,i,S as $}from"./assets/vendor-427610a5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();p.defaults.baseURL="https://pixabay.com/api/";const M="40365251-7556fc461aeff4605ce69e2bc";async function g(t,o,r){const s=`?key=${M}&q=${t}&page=${o}&per_page=${r}&image_type=photo&orientation=horizontal&safesearch=true`,{data:e}=await p.get(s);return e}const P={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},a=document.querySelector("body");let m=[];function S(t){if(t){let o=t.length,r=Math.floor(Math.random()*o);a.style.backgroundColor="transparent",a.style.backgroundImage=`url(${t[r]})`,a.style.backgroundRepeat="no-repeat",a.style.backgroundAttachment="fixed"}}const{form:E,gallery:y,btnLoadMore:q}=P,d=40;let l=1,f="",u=!1;q.style.display="none";E.addEventListener("submit",C);async function C(t){t.preventDefault();const{searchQuery:o}=t.currentTarget.elements;if(m=[],f=o.value.trim().toLowerCase().split(" ").join("+"),f===""){a.style.backgroundColor="#fff",a.style.backgroundImage="none",i.info({message:"Enter your request, please!",position:"center",timeout:4e3});return}l=1,y.innerHTML="",t.currentTarget.reset();try{const{hits:r,total:s}=await g(f,l,d);if(s===0){a.style.backgroundColor="#fff",i.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"center",timeout:4e3});return}a.style.backgroundColor="#fff",s<=d?i.success({message:`Hooray! We found ${s} images. But it's only 1 page`,position:"center",timeout:4e3}):(i.success({message:`Hooray! We found ${s} images.`,position:"center",timeout:4e3}),window.addEventListener("scroll",w)),h(r),S(m),L.refresh()}catch(r){b(r.message)}}function h(t){const o=t.map(({webformatURL:r,largeImageURL:s,tags:e,likes:n,views:c,comments:k,downloads:v})=>(m.push(s),`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${s}">
                <img class="img" src="${r}" alt="${e}" width="300" loading="lazy" />
            </a>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b><span class="value-num">${n}</span>
            </p>
            <p class="info-item">
            <b>Views: </b><span class="value-num">${c}</span>
            </p>
            <p class="info-item">
            <b>Comments: </b><span class="value-num">${k}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${v}</span>
            </p>
        </div>
        </div>`));y.insertAdjacentHTML("beforeend",o.join(""))}async function O(){if(x()&&!u){l+=1,L.refresh();try{u=!0;const{hits:t,totalHits:o}=await g(f,l,d),r=Math.ceil(o/d);h(t),l===r&&!u&&(i.info({message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:4e3}),window.removeEventListener("scroll",w))}catch(t){b(t.message)}finally{u=!1}}}function b(t){a.style.backgroundColor="#fff",i.error({message:`Oops! Something went wrong! ${t} Try reloading the page or make another choice!`,position:"center",timeout:4e3})}function w(){O()}function x(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}let L=new $(".img_wrap a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
