import{a as g,i,S as $}from"./assets/vendor-427610a5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();g.defaults.baseURL="https://pixabay.com/api/";const P="40365251-7556fc461aeff4605ce69e2bc";async function y(t,r,o){const s=`?key=${P}&q=${t}&page=${r}&per_page=${o}&image_type=photo&orientation=horizontal&safesearch=true`,{data:e}=await g.get(s);return e}const S={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},a=document.querySelector("body");let p=[];function E(t){if(t){let r=t.length-1,o=Math.floor(Math.random()*r);a.style.backgroundColor="transparent",a.style.backgroundImage=`url(${t[o]})`,a.style.backgroundRepeat="no-repeat",a.style.backgroundAttachment="fixed"}}const{form:M,gallery:h,btnLoadMore:q}=S,d=40;let u=1,l="",m=!1;q.style.display="none";M.addEventListener("submit",O);async function O(t){t.preventDefault();const{searchQuery:r}=t.currentTarget.elements;p=[];let o=r.value.trim().toLowerCase().split(" ").join("+");if(o===""){a.style.backgroundColor="#fff",a.style.backgroundImage="none",i.info({message:"Enter your request, please!",position:"center",timeout:4e3});return}if(o===l){i.info({title:"Info",message:`The previous ${o} request has already been received, please enter a new search parameter.`,position:"topRight",color:"blue"}),t.currentTarget.reset();return}o!==l&&window.removeEventListener("scroll",f),l=o,u=1,h.innerHTML="",t.currentTarget.reset();try{const{hits:s,total:e}=await y(l,u,d);if(e===0){a.style.backgroundColor="#fff",i.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"center",timeout:4e3});return}a.style.backgroundColor="#fff",e<=d?(i.success({message:`Hooray! We found ${e} images. But it's only 1 page`,position:"center",timeout:4e3}),window.removeEventListener("scroll",f)):(i.success({message:`Hooray! We found ${e} images.`,position:"center",timeout:4e3}),window.addEventListener("scroll",f)),b(s),E(p),v.refresh()}catch(s){w(s.message)}}function b(t){const r=t.map(({webformatURL:o,largeImageURL:s,tags:e,likes:n,views:c,comments:L,downloads:k})=>(p.push(s),`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${s}">
                <img class="img" src="${o}" alt="${e}" width="300" loading="lazy" />
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
            <b>Comments: </b><span class="value-num">${L}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${k}</span>
            </p>
        </div>
        </div>`));h.insertAdjacentHTML("beforeend",r.join(""))}async function C(){if(T()&&!m){u+=1,v.refresh();try{m=!0;const{hits:t,totalHits:r}=await y(l,u,d),o=Math.ceil(r/d);b(t),u===o&&(i.info({message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:4e3}),window.removeEventListener("scroll",f))}catch(t){w(t.message)}finally{m=!1}}}function w(t){a.style.backgroundColor="#fff",i.error({message:`Oops! Something went wrong! ${t} Try reloading the page or make another choice!`,position:"center",timeout:4e3})}function f(){C()}function T(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}let v=new $(".img_wrap a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
