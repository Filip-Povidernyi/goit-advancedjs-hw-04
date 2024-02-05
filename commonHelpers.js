import{a as p,i,S as $}from"./assets/vendor-427610a5.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();p.defaults.baseURL="https://pixabay.com/api/";const P="40365251-7556fc461aeff4605ce69e2bc";async function g(t,n,s){const r=`?key=${P}&q=${t}&page=${n}&per_page=${s}&image_type=photo&orientation=horizontal&safesearch=true`,{data:e}=await p.get(r);return e}const S={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},a=document.querySelector("body");let m=[];function E(t){t&&(a.style.backgroundColor="transparent",a.style.backgroundImage=`url(${t[0]})`,a.style.backgroundRepeat="no-repeat",a.style.backgroundAttachment="fixed")}const{form:M,gallery:y,btnLoadMore:q}=S,d=40;let l=1,f="",u=!1;q.style.display="none";M.addEventListener("submit",C);async function C(t){t.preventDefault();const{searchQuery:n}=t.currentTarget.elements;if(m=[],f=n.value.trim().toLowerCase().split(" ").join("+"),f===""){a.style.backgroundColor="#fff",a.style.backgroundImage="none",i.info({message:"Enter your request, please!",position:"center",timeout:4e3});return}l=1,y.innerHTML="",t.currentTarget.reset();try{const{hits:s,total:r}=await g(f,l,d);if(r===0){a.style.backgroundColor="#fff",i.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"center",timeout:4e3});return}a.style.backgroundColor="#fff",r<=d?i.success({message:`Hooray! We found ${r} images. But it's only 1 page`,position:"center",timeout:4e3}):(i.success({message:`Hooray! We found ${r} images.`,position:"center",timeout:4e3}),window.addEventListener("scroll",w)),h(s),E(m),L.refresh()}catch(s){b(s.message)}}function h(t){const n=t.map(({webformatURL:s,largeImageURL:r,tags:e,likes:o,views:c,comments:k,downloads:v})=>(m.push(r),`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${r}">
                <img class="img" src="${s}" alt="${e}" width="300" loading="lazy" />
            </a>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b><span class="value-num">${o}</span>
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
        </div>`));y.insertAdjacentHTML("beforeend",n.join(""))}async function O(){if(H()&&!u){l+=1,L.refresh();try{u=!0;const{hits:t,totalHits:n}=await g(f,l,d),s=Math.ceil(n/d);h(t),l===s&&!u&&(i.info({message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:4e3}),window.removeEventListener("scroll",w))}catch(t){b(t.message)}finally{u=!1}}}function b(t){a.style.backgroundColor="#fff",i.error({message:`Oops! Something went wrong! ${t} Try reloading the page or make another choice!`,position:"center",timeout:4e3})}function w(){O()}function H(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}let L=new $(".img_wrap a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
