import{a as k,i as l,S as $}from"./assets/vendor-427610a5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const P="https://pixabay.com/api/",E="40365251-7556fc461aeff4605ce69e2bc";async function S(t,r,s){const n=`${P}?key=${E}&q=${t}&page=${r}&per_page=${s}&image_type=photo&orientation=horizontal&safesearch=true`;return(await k.get(n)).data}const H={form:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},a=document.querySelector("body");let m=[];function M(t){t&&(a.style.backgroundColor="transparent",a.style.backgroundImage=`url(${t[0]})`,a.style.backgroundRepeat="no-repeat",a.style.backgroundAttachment="fixed")}const{form:q,gallery:h,btnLoadMore:i}=H,f=40;let u=1,d="";i.style.display="none";q.addEventListener("submit",C);function C(t){t.preventDefault(),h.innerHTML="",u=1;const{searchQuery:r}=t.currentTarget.elements;if(m=[],d=r.value.trim().toLowerCase().split(" ").join("+"),d===""){i.classList.add("is-hidden"),a.style.backgroundColor="#fff",a.style.backgroundImage="none",l.info({message:"Enter your request, please!",position:"center",timeout:4e3});return}S(d,u,f).then(s=>{const n=s.hits;s.totalHits===0?(i.classList.add("is-hidden"),a.style.backgroundColor="#fff",l.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"center",timeout:4e3})):(i.classList.add("is-hidden"),a.style.backgroundColor="#fff",l.success({message:`Hooray! We found ${s.totalHits} images.`,position:"center",timeout:4e3}),g(n),L.refresh()),s.totalHits>f&&(i.classList.remove("is-hidden"),window.addEventListener("scroll",b))}).catch(y),i.addEventListener("click",p),t.currentTarget.reset()}function g(t){const r=t.map(({webformatURL:s,largeImageURL:n,tags:e,likes:o,views:c,comments:v,downloads:w})=>(m.push(n),`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${n}">
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
            <b>Comments: </b><span class="value-num">${v}</span>
            </p>
            <p class="info-item">
            <b>Downloads: </b><span class="value-num">${w}</span>
            </p>
        </div>
        </div>`));h.insertAdjacentHTML("beforeend",r.join("")),M(m)}function p(){u+=1,fetchPhoto(d,u,f).then(t=>{const r=t.hits,s=Math.ceil(t.totalHits/f);g(r),u===s&&(i.classList.add("is-hidden"),l.info({message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:4e3}),i.removeEventListener("click",p),window.removeEventListener("scroll",b)),L.refresh()}).catch(y)}function y(){i.classList.add("is-hidden"),a.style.backgroundColor="#fff",l.error({message:"Oops! Something went wrong! Try reloading the page or make another choice!",position:"center",timeout:4e3})}function b(){O()&&p()}function O(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}let L=new $(".img_wrap a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
