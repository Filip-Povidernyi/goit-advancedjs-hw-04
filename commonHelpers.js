import{a as m,i as c}from"./assets/vendor-85e7f25d.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function t(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=t(e);fetch(e.href,o)}})();m.defaults.baseURL="https://pixabay.com/api/";const y="40365251-7556fc461aeff4605ce69e2bc",p=async(r,s=1,t=40)=>{const a=`?key=${y}&q=${r}&page=${s}&per_page=${t}&image_type=photo&orientation=horizontal&safesearch=true`;return(await m.get(a)).data},g=document.querySelector(".search-form"),l=document.querySelector(".gallery"),i=document.querySelector(".load-more");let d=1,u=40;l.innerHTML="";i.classList.add("is-hidden");g.addEventListener("submit",async r=>{r.preventDefault(),d=1;const s=r.currentTarget.elements.searchQuery.value;try{const t=await p(s.trim().toLowerCase(),d,u);if(console.log("data",t),t.total===0){i.classList.add("is-hidden"),l.innerHTML="",c.info({message:"For your request, no images were found. Please try again.",position:"topRight",timeout:4e3});return}c.info({message:`Hooray! We found ${t.total} images.`,position:"topRight",timeout:4e3}),l.innerHTML=f(t.hits).join("");let a=Math.floor(Math.random()*(t.hits.length-1));const e=t.hits[a].largeImageURL;document.body.style.backgroundImage=`url(${e})`,t.total>40?i.classList.remove("is-hidden"):i.classList.add("is-hidden")}catch(t){c.error({message:`Oops! Something went wrong! ${t} Try reloading the page or make another choice!`,position:"topRight",timeout:4e3}),l.innerHTML="",i.classList.add("is-hidden")}});const f=r=>r.map(({webformatURL:s,tags:t,largeImageURL:a,likes:e,views:o,comments:n,downloads:h})=>`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${a}">
                <img class="img" src="${s}" alt="${t}" width="300" loading="lazy" />
            </a>
        </div>
        <div class="info">
            <p class="info-item">
            <b>Likes: </b><span class="value-num">${e}</span>
            </p>
            <p class="info-item">
            <b>Views: </b><span class="value-num">${o}</span>
            </p>
            <p class="info-item">
            <b>Comments: </b><span class="value-num">${n}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${h}</span>
            </p>
        </div>
        </div>`);i.addEventListener("click",async()=>{const r=g.elements.searchQuery.value;d+=1;try{const s=await p(r.trim().toLowerCase(),d,u);l.insertAdjacentHTML("beforeend",f(s.hits).join("")),d>=Math.ceil(s.totalHits/u)&&(i.classList.add("is-hidden"),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3}))}catch(s){c.error({message:`Oops! Something went wrong! ${s} Try reloading the page or make another choice!`,position:"topRight",timeout:4e3}),i.classList.add("is-hidden")}});
//# sourceMappingURL=commonHelpers.js.map
