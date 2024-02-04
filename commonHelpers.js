import{a as $,i as l,S as E}from"./assets/vendor-427610a5.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const S="https://pixabay.com/api/",P="40365251-7556fc461aeff4605ce69e2bc";async function g(t,r,s){const i=`${S}?key=${P}&q=${t}&page=${r}&per_page=${s}&image_type=photo&orientation=horizontal&safesearch=true`;return(await $.get(i)).data}const H={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),btnLoadMore:document.querySelector(".load-more")},n=document.querySelector("body");let m=[];function M(t){t&&(n.style.backgroundColor="transparent",n.style.backgroundImage=`url(${t[0]})`,n.style.backgroundRepeat="no-repeat",n.style.backgroundAttachment="fixed")}const{searchForm:q,gallery:h,btnLoadMore:a}=H,f=40;let d=1,u="";a.classList.add("is-hidden");q.addEventListener("submit",C);function C(t){t.preventDefault(),h.innerHTML="",d=1;const{searchQuery:r}=t.currentTarget.elements;if(u=r.value.trim().toLowerCase().split(" ").join("+"),u===""){a.classList.add("is-hidden"),n.style.backgroundColor="#fff",n.style.backgroundImage="none",l.info({message:"Enter your request, please!",position:"center",timeout:4e3});return}g(u,d,f).then(s=>{const i=s.hits;s.totalHits===0?(a.classList.add("is-hidden"),n.style.backgroundColor="#fff",n.style.backgroundImage="none",l.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"center",timeout:4e3})):(a.classList.add("is-hidden"),n.style.backgroundColor="#fff",n.style.backgroundImage="none",l.success({message:`Hooray! We found ${s.totalHits} images.`,position:"center",timeout:4e3}),y(i),k.refresh()),s.totalHits>f&&(a.classList.remove("is-hidden"),window.addEventListener("scroll",L))}).catch(b),a.addEventListener("click",p),t.currentTarget.reset()}function y(t){const r=t.map(({webformatURL:s,largeImageURL:i,tags:e,likes:o,views:c,comments:v,downloads:w})=>(m.push(i),`<div class="photo-card">
        <div class="img_wrap">
            <a class="gallery_link" href="${i}">
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
        </div>`));h.insertAdjacentHTML("beforeend",r.join("")),M(m),m=[]}function p(){d+=1,g(u,d,f).then(t=>{const r=t.hits,s=Math.ceil(t.totalHits/f);y(r),d===s&&(a.classList.add("is-hidden"),l.info({message:"We're sorry, but you've reached the end of search results.",position:"center",timeout:4e3}),a.removeEventListener("click",p),window.removeEventListener("scroll",L)),k.refresh()}).catch(b)}function b(){a.classList.add("is-hidden"),n.style.backgroundColor="#fff",n.style.backgroundImage="none",l.error({message:"Oops! Something went wrong! Try reloading the page or make another choice!",position:"center",timeout:4e3})}function L(){O()&&p()}function O(){return window.innerHeight+window.scrollY>=document.documentElement.scrollHeight}let k=new E(".img_wrap a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
