import{a as g,i,S as $}from"./assets/vendor-427610a5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerpolicy&&(n.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?n.credentials="include":e.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=r(e);fetch(e.href,n)}})();g.defaults.baseURL="https://pixabay.com/api/";const M="40365251-7556fc461aeff4605ce69e2bc";async function y(t,o,r){const s=`?key=${M}&q=${t}&page=${o}&per_page=${r}&image_type=photo&orientation=horizontal&safesearch=true`,{data:e}=await g.get(s);return e}const P={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},a=document.querySelector("body");let m=[];function S(t){if(t){let o=t.length-1,r=Math.floor(Math.random()*o);a.style.backgroundColor="transparent",a.style.backgroundImage=`url(${t[r]})`,a.style.backgroundRepeat="no-repeat",a.style.backgroundAttachment="fixed"}}const{form:E,gallery:h,btnLoadMore:q}=P,d=40;let l=1,f="",u=!1;q.style.display="none";E.addEventListener("submit",C);async function C(t){t.preventDefault();const{searchQuery:o}=t.currentTarget.elements;if(m=[],f=o.value.trim().toLowerCase().split(" ").join("+"),f===""){a.style.backgroundColor="#fff",a.style.backgroundImage="none",i.info({message:"Enter your request, please!",position:"center",timeout:4e3});return}l=1,h.innerHTML="",t.currentTarget.reset(),window.removeEventListener("scroll",p);try{const{hits:r,total:s}=await y(f,l,d);if(s===0){a.style.backgroundColor="#fff",i.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"center",timeout:4e3});return}a.style.backgroundColor="#fff",s<=d?i.success({message:`Hooray! We found ${s} images. But it's only 1 page`,position:"center",timeout:4e3}):(i.success({message:`Hooray! We found ${s} images.`,position:"center",timeout:4e3}),window.addEventListener("scroll",p)),b(r),S(m),v.refresh()}catch(r){w(r.message)}}function b(t){const o=t.map(({webformatURL:r,largeImageURL:s,tags:e,likes:n,views:c,comments:L,downloads:k})=>(m.push(s),`<div class="photo-card">
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
            <b>Comments: </b><span class="value-num">${L}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${k}</span>
            </p>
        </div>
        </div>`));h.insertAdjacentHTML("beforeend",o.join(""))}async function O(){if(x()&&!u){l+=1,v.refresh();try{u=!0;const{hits:t,totalHits:o}=await y(f,l,d),r=Math.ceil(o/d);b(t),l===r&&!u&&(i.info({message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:4e3}),window.removeEventListener("scroll",p))}catch(t){w(t.message)}finally{u=!1}}}function w(t){a.style.backgroundColor="#fff",i.error({message:`Oops! Something went wrong! ${t} Try reloading the page or make another choice!`,position:"center",timeout:4e3})}function p(){O()}function x(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}let v=new $(".img_wrap a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
