(()=>{var e={550:()=>{const e=document.querySelector(".buy-ticket .button_small"),t=document.querySelector(".booking"),i=document.querySelector(".booking__close-cross"),s=document.querySelector(".booking > .section");e.addEventListener("click",(()=>{t.classList.add("booking__arrive"),s.classList.add("booking__arrive")})),i.addEventListener("click",(()=>{s.classList.remove("booking__arrive")})),t.addEventListener("click",(e=>{e.target.classList.contains("booking")&&s.classList.remove("booking__arrive")})),s.addEventListener("transitionend",(()=>{s.classList.contains("booking__arrive")||t.classList.remove("booking__arrive")}))},327:()=>{const e=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&e.target.classList.add("gallery-img_visible")}))}));let t=document.querySelectorAll(".gallery_img");t.forEach((t=>{e.observe(t)}));const i=document.querySelector(".gallery__colomns");new IntersectionObserver((()=>{t.forEach((e=>{e.classList.remove("gallery-img_visible")}))})).observe(i)},757:()=>{const e=document.querySelector(".burger-menu"),t=document.querySelector(".header .navigation"),i=document.querySelector(".welcome-louvre");e.addEventListener("click",(()=>{e.classList.toggle("open"),t.classList.toggle("open"),i.classList.toggle("open")})),i.addEventListener("click",(()=>{e.classList.remove("open"),t.classList.remove("open"),i.classList.remove("open")}))},753:()=>{const e=document.querySelector(".wand__donut"),t=document.querySelector(".picture-explore__img_before"),i=document.querySelector(".picture-explore__container");function s(e){e.preventDefault();let s=i.offsetWidth,o=i.getBoundingClientRect().left,n=e.clientX-o;n>=0&&n<=s&&(t.style.width=`${n}px`),(e.clientX>o+s+10||e.clientX<o-10)&&r()}function r(){i.removeEventListener("mousemove",s)}e.addEventListener("pointerdown",(()=>{i.addEventListener("mousemove",s)})),document.addEventListener("pointerup",r)},243:()=>{document.querySelector(".video-wrapper__tool-bar").addEventListener("input",(function(e){const t=e.target.value;e.target.style.background=`linear-gradient(to right, #710707 0%, #710707 ${t}%, #e5e5e5 ${t}%, #e5e5e5 100%)`}))},928:()=>{document.querySelectorAll(".button_book").forEach((e=>{e.addEventListener("click",(function(e){const t=e.clientX,i=e.clientY,s=e.target.offsetTop,r=t-e.target.offsetLeft,o=i-s,n=document.createElement("span");n.classList.add("circle"),n.style.top=o+"px",n.style.left=r+"px",this.appendChild(n),setTimeout((()=>n.remove()),500)}))}))},854:()=>{let e=document.querySelectorAll(".gallery_img");const t=e.length-1;e.forEach(((i,s)=>{let r=Math.ceil(Math.random()*t);r==s&&(r=0),i.before(e[r])}))},223:()=>{const e=document.querySelector(".buy-ticket"),t=document.getElementById("permanent-exhibition"),i=document.getElementById("temporary-exhibition"),s=document.getElementById("combined-admission"),r=document.getElementById("ticket-form__amount-number_basic"),o=document.getElementById("ticket-form__amount-number_senior"),n=document.getElementById("ticket-form__calculation"),a=document.forms.booking,l=document.forms.booking.basic,c=document.forms.booking.senior,d=document.forms.booking.type,u=document.querySelector(".overview__qty_basic"),m=document.querySelector(".overview__qty_senior"),v=document.querySelector(".overview__total"),h=document.querySelector(".overview__received_type"),y=document.querySelector(".overview__sum_basic"),p=document.querySelector(".overview__sum_senior"),b=document.querySelectorAll(".entry-ticket__text_basic"),_=document.querySelectorAll(".entry-ticket__text_senior");let f=localStorage.getItem("ticket-type");function g(){t.checked&&(f="permanent"),i.checked&&(f="temporary"),s.checked&&(f="combined"),l.value=r.value,c.value=o.value,d.value=f,S(),L()}function S(){k(),y.textContent=ticketCost*+r.value+"€",p.textContent=ticketCost*+o.value*.5+"€";let e=ticketCost*+r.value+ticketCost*+o.value*.5;n.textContent=`Total € ${e}`,v.textContent=`${e}€`}function L(){u.value=l.value,m.value=c.value,r.value=l.value,o.value=c.value,f=d.value,localStorage.setItem("basicAmount",u.value),localStorage.setItem("seniorAmount",m.value),localStorage.setItem("ticket-type",d.value),S()}function k(){switch(f){case"combined":s.checked=!0,ticketCost=s.value,h.textContent="Combined Admissionn";break;case"temporary":i.checked=!0,ticketCost=i.value,h.textContent="Temporary exhibition";break;default:t.checked=!0,ticketCost=t.value,h.textContent="Permanent exhibition"}b.forEach((e=>{e.textContent=`Basic (${ticketCost}€)`})),_.forEach((e=>{e.textContent=`Senior (${ticketCost/2}€)`}))}k(),localStorage.getItem("basicAmount")&&(r.value=localStorage.getItem("basicAmount")),localStorage.getItem("seniorAmount")&&(o.value=localStorage.getItem("seniorAmount")),g(),e.addEventListener("click",g),a.addEventListener("click",L)},881:()=>{const e=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&e.target.classList.add("section_visible")}))}));e.observe(document.querySelector(".title")),e.observe(document.querySelector(".virtual-tour .title")),e.observe(document.querySelector(".video-journey .title")),e.observe(document.querySelector(".picture-explore .title")),e.observe(document.querySelector(".buy-ticket .title")),e.observe(document.querySelector(".contacts .title"))},877:()=>{document.forms.booking;const e=document.forms.booking.date,t=document.forms.booking.time,i=document.forms.booking.name,s=document.forms.booking.email,r=document.forms.booking.tel,o=document.querySelector(".overview__received_time"),n=document.querySelector(".overview__received_date");t.addEventListener("blur",(e=>{e.preventDefault();let i=Number(t.value.slice(0,2)),s=Number(t.value.slice(3,5));s>=0&&s<15&&(s="00"),s>=15&&s<45&&(s="30"),s>=45&&s<60&&i<=17?(s="00",i++):s="00",i<=9&&(i="09"),i>=18&&(i="18"),t.value=`${i}:${s}`,o.textContent=t.value,t.classList.add("valid")})),e.addEventListener("blur",(t=>{t.preventDefault();let i=new Date,s=new Date(e.value),r=s.getMonth(),o=s.getDate(),a=s.getDay();s.getTime()-i.getTime()<0&&(r=i.getMonth(),o=i.getDate(),a=i.getDay(),outputMonth=r+1>9?r+1:"0"+r+1,outputDate=o>9?o:"0"+o,e.value=`${i.getFullYear()}-${outputMonth}-${outputDate}`),n.textContent=`${function(e){switch(e){case 0:return"Sunday";case 1:return"Monday";case 2:return"Tuesday";case 3:return"Wednesday";case 4:return"Thursday";case 5:return"Friday";case 6:return"Saturday"}}(a)}, ${function(e){switch(e){case 0:return"January";case 1:return"February";case 2:return"March";case 3:return"April";case 4:return"May";case 5:return"June";case 6:return"July";case 7:return"August";case 8:return"September";case 9:return"October";case 10:return"November";case 11:return"December"}}(r)} ${o}`,e.classList.add("valid")})),i.addEventListener("blur",(e=>{e.preventDefault(),/^[a-zа-яё ]{3,15}$/i.test(i.value)?i.classList.add("valid"):(i.classList.add("invalid"),alert("Invalid name.\nName cannot be less than 3 and more than 15 symbols including spaces.\nPlease try again."))})),i.addEventListener("focus",(()=>{i.classList.remove("invalid","valid")})),s.addEventListener("blur",(e=>{e.preventDefault(),/^[a-z0-9_-]{3,15}@[a-z]{4,}\.[a-z]{2,}$/i.test(s.value)?s.classList.add("valid"):(s.classList.add("invalid"),alert("Invalid email.\nEmail should be looks like username@example.com .\nPlease try again."))})),s.addEventListener("focus",(()=>{s.classList.remove("invalid","valid")})),r.addEventListener("blur",(e=>{e.preventDefault();let t=!1,i=/^[0-9]{2,3}$/,s=r.value.replaceAll(" ","-");if(s.includes("-")){let e=s.split("-");console.log("tels=",e),t=e.every((e=>i.test(e)))&&e.join("").length<=10}else t=/^[0-9]{0,10}$/.test(s);t?r.classList.add("valid"):(r.classList.add("invalid"),alert("Invalid phone number.\nPhone number should be shorter than 10 digits and may include spaces or dashes to separate 2 or 3 digits.\nPlease try again."))})),r.addEventListener("focus",(()=>{r.classList.remove("invalid","valid")}))}},t={};function i(s){var r=t[s];if(void 0!==r)return r.exports;var o=t[s]={exports:{}};return e[s](o,o.exports,i),o.exports}(()=>{"use strict";i(243),i(223),i(881);const e=document.querySelector(".video-player"),t=document.querySelector(".video-wrapper"),s=document.querySelector(".video-wrapper__play-icon"),r=document.querySelector(".tool-bar__time-bar"),o=document.querySelector(".tool-bar__volume-bar"),n=document.querySelector(".tool-bar__volume"),a=document.querySelector(".tool-bar__play"),l=document.querySelector(".speed-rate"),c=document.querySelector(".video-player__playlist");c.style.visibility="hidden";let d=!1,u=0,m=!1;for(let e=4;e>=0;e--)w(c,"playlist__poster",`assets/video/poster${e}.jpg`,`Video ${e}`,e,0);function v(){d?(d=!1,o.value=o.dataset.dataVolume,_(o.value)):(d=!0,o.dataset.dataVolume=o.value,_(0))}function h(){e.pause(),s.style.visibility="visible",a.classList.remove("tool-bar__pause");let t=c.querySelector(`[data-number-of-video="${u}"]`);e.currentTime>0&&(t.lastElementChild.textContent=`Watched: ${Math.floor(e.currentTime)} sec`)}function y(){e.paused?(s.style.visibility="hidden",a.classList.add("tool-bar__pause"),e.play()):h()}function p(){let t=Math.ceil(e.currentTime/e.duration*100)||0;b(r,t)}function b(e,t){e.value=t,e.style.background=`linear-gradient(to right, #710707 0%, #710707 ${t}%, #fff ${t}%, #fff 100%)`}function _(t){e.volume=t/100,b(o,t),t<50&&(n.classList.add("tool-bar__volume_half"),n.classList.remove("tool-bar__volume_zero","tool-bar__mute")),t<=20&&(n.classList.add("tool-bar__volume_zero"),n.classList.remove("tool-bar__mute")),0==t&&n.classList.add("tool-bar__mute"),t>=50&&n.classList.remove("tool-bar__volume_half","tool-bar__volume_zero","tool-bar__mute")}function f(e){const t=document.querySelector(".tool-bar__full-screen");document.fullscreenElement?(document.exitFullscreen(),t.classList.remove("tool-bar__full-screen_exit")):(e.requestFullscreen().catch((e=>{alert(`Error attempting to enable full-screen mode: ${e.message} (${e.name})`)})),t.classList.add("tool-bar__full-screen_exit"))}function g(){h(),u++,u>=5&&(u=0),slideVideo(u,"shift-right")}function S(){h(),u--,u<0&&(u=4),slideVideo(u,"shift-left")}function L(t=0){e.src=`assets/video/video${t}.mp4`,e.poster=`assets/video/poster${t}.jpg`,"visible"==l.style.visibility&&k(e.playbackRate)}function k(t){l.textContent=` ${e.playbackRate}x `,l.style.visibility="visible",1==t&&setTimeout((()=>l.style.visibility="hidden"),2e3)}function q(t){e.currentTime+t<=0?e.currentTime=0:e.currentTime+t>=e.duration?e.currentTime=e.duration:e.currentTime+=t}function E(){h(),"hidden"==c.style.visibility?c.style.visibility="visible":c.style.visibility="hidden"}function w(e,t,i,s,r,o){let n=document.createElement("div");null!=r&&(n.dataset.numberOfVideo=r),null!=i&&n.insertAdjacentHTML("beforeend",`<img src="${i}">`),null!=s&&n.insertAdjacentHTML("beforeend",`<p>Name: ${s}</p>`),null!=o&&n.insertAdjacentHTML("beforeend","<p>Unwatched</p>"),n.classList.add(t),e.prepend(n)}_(o.value),p(),t.addEventListener("click",(function(e){(e.target.classList.contains("video-player")||e.target.classList.contains("tool-bar__play")||e.target.classList.contains("video-wrapper__play-icon"))&&y(),e.target.classList.contains("tool-bar__volume")&&v(),e.target.classList.contains("tool-bar__full-screen")&&f(t),e.target.classList.contains("tool-bar__previous")&&S(),e.target.classList.contains("tool-bar__next")&&g(),e.target.classList.contains("button_playlist")&&E(),e.target.classList.contains("playlist__close-button")&&E()})),c.addEventListener("click",(function(e){for(let t=0;t<e.path.length;t++)if("DIV"==e.path[t].nodeName&&e.path[t].classList.contains("playlist__poster")){u=e.path[t].dataset.numberOfVideo,E(),L(u);break}})),e.addEventListener("pause",h),e.addEventListener("timeupdate",p),t.addEventListener("input",(function(t){const i=t.target.value;b(t.target,i),t.target.classList.contains("tool-bar__time-bar")&&(e.currentTime=i*e.duration/100),t.target.classList.contains("tool-bar__volume-bar")&&_(i)})),document.addEventListener("keydown",(function(i){var s;if(m)switch(i.preventDefault(),i.code){case"Space":case"KeyK":y();break;case"KeyM":v();break;case"KeyF":f(t);break;case"Period":i.shiftKey&&(e.playbackRate+=.25,e.playbackRate>=2.5&&(e.playbackRate=2.5),k(e.playbackRate));break;case"Comma":i.shiftKey&&(e.playbackRate-=.25,e.playbackRate<=.25&&(e.playbackRate=.25),k(e.playbackRate));break;case"KeyJ":q(-10);break;case"KeyL":q(10);break;case"KeyP":i.shiftKey&&S();break;case"KeyN":i.shiftKey&&g();break;default:i.code.match(/(Digit[0-9])|(Numpad[0-9])/)&&(s=10*i.code.slice(-1))>=0&&s<=100&&(e.currentTime=e.duration/100*s)}})),new IntersectionObserver((e=>{e.forEach((e=>{e.intersectionRatio>0?m=!0:(m=!1,h())}))})).observe(t);var $=document.createElement("script");$.src="https://www.youtube.com/iframe_api";var x=document.getElementsByTagName("body")[0];x.parentNode.insertBefore($,x);var C={};function A(e){e.data==YT.PlayerState.PLAYING&&I(e.target)}function T(e){e.target.playVideo()}function I(e=null){for(let t in C)C[t]!=e&&C[t].stopVideo()}function R(e){var t;e.preventDefault(),t=e.currentTarget.id.slice(1),C[t]=new YT.Player(`${t}`,{videoId:`${t}`,events:{onReady:T,onStateChange:A}})}document.querySelectorAll(".iframe-slide").forEach((e=>{e.addEventListener("click",R)}));class D{constructor({classOfWrapper:e,firstSlideClass:t,isControlled:i=!0,isAutoPlay:s=!1,callbackFnc:r=(()=>{})}){this.callback=r,this.wrapper=document.querySelector(`.${e}`),this.container=this.wrapper.querySelector(`.${e}__container`),this.slideClass=t,this.slidersArray=this.container.querySelectorAll(`.${t}`),this.slideWidth=this.slidersArray[0].offsetWidth,i&&(this.initPanel(),this.turnSliderOn()),this.initSlider()}initSlider(){this.isReadySlide=!0,this.qtySlides=this.slidersArray.length,this.currentSlide=0,this.slideEnded()}turnSliderOn(){this.panel.addEventListener("click",(e=>this.clickHandler(e))),this.container.addEventListener("transitionend",(e=>this.slideEnded(e))),this.wrapper.addEventListener("pointerdown",(e=>this.mouseStartSwipe(e))),this.wrapper.addEventListener("pointerup",(e=>this.mouseEndSwipe(e))),this.wrapper.ontouchmove=function(){return!1},this.wrapper.onmousemove=function(){return!1}}initPanel(){this.panel=this.wrapper.querySelector(".slider__panel"),this.panelBullets=this.panel.querySelectorAll(".panel__bullet"),this.panelCounter=this.panel.querySelector(".panel__counter_number"),this.leftBtn=this.panel.querySelector(".left-button"),this.rightBtn=this.panel.querySelector(".right-button"),this.panelBullets.forEach(((e,t)=>{e.dataset.slideNumber=t}))}clickHandler(e){this.isReadySlide&&(e.target.classList.contains("left-button")&&this.slideLeft(),e.target.classList.contains("right-button")&&this.slideRight(),e.target.classList.contains("panel__bullet")&&this.panelHandler(e))}slideRight(){this.shift=1,this.currentSlide++,this.currentSlide=this.currentSlide%this.qtySlides,this.slideOut()}slideLeft(){this.shift=-1,this.currentSlide--,this.currentSlide=(this.currentSlide+this.qtySlides)%this.qtySlides,this.slideOut()}slideOut(){this.isReadySlide=!1,this.slidersArray=this.container.querySelectorAll(`.${this.slideClass}`);for(let e=0;e<this.shift;e++){let t=this.slidersArray[(e+this.currentSlide-this.shift+this.qtySlides)%(this.qtySlides-1)].cloneNode();t.style.order=e+this.qtySlides,this.container.append(t)}this.container.style.transitionProperty="left",this.container.style.left=`-${(this.shift+1)*this.slideWidth}px`,this.panelCounter&&(this.panelCounter.innerHTML=this.currentSlide+1<10?`0${this.currentSlide+1}`:`${this.currentSlide+1}`),this.panelBullets.forEach((e=>{e.dataset.slideNumber==this.currentSlide?e.classList.add("panel__bullet_marked"):e.classList.remove("panel__bullet_marked")})),this.callback(this.currentSlide)}slideEnded(){this.slidersArray=this.container.querySelectorAll(`.${this.slideClass}`);for(let e=0;e<this.shift;e++)this.slidersArray[e+this.qtySlides].remove();for(let e=0;e<this.qtySlides;e++)this.slidersArray[e].style.order=""+(e-this.currentSlide-1+this.qtySlides)%this.qtySlides;this.container.style.transitionProperty="none",this.container.style.left=`-${this.slideWidth}px`,this.isReadySlide=!0}panelHandler(e){this.shift=e.target.dataset.slideNumber-this.currentSlide,this.currentSlide=+e.target.dataset.slideNumber,this.shift<-1&&(this.shift=this.shift+this.qtySlides),this.slideOut()}mouseStartSwipe(e){1==e.which&&this.isReadySlide&&(this.mouseStartCoordinate={x:e.pageX,y:e.pageY})}mouseEndSwipe(e){if(1==e.which&&this.isReadySlide){let t={x:e.pageX,y:e.pageY},i=t.x-this.mouseStartCoordinate.x,s=t.y-this.mouseStartCoordinate.y;Math.abs(i)>=100&&Math.abs(s)<100&&(i>0?this.slideLeft():this.slideRight())}}}new D({classOfWrapper:"slider__wrapper",firstSlideClass:"slider__slide"}),new D({classOfWrapper:"video-journey__slider",firstSlideClass:"iframe-slide",callbackFnc:function(e){h(),L(e),I()}}),i(550),i(928),i(327),i(854),i(757),i(753),i(877),console.log("Самопроверка: "),console.log("1)Слайдер в секции Welcome +24: "),console.log("2)Слайдер в секции Video +20"),console.log("3)Кастомный видеоплеер +36:"),console.log("4)Слайдер сравнения изображений в секции Explore +10"),console.log("5)Анимация при прокрутке изображений в секции Galery +8"),console.log("6)Калькулятор продажи билетов в секции Tiskets +10"),console.log("7)Калькулятор продажи билетов в форме продажи билетов +14"),console.log("8)Валидация формы +16"),console.log("9)Интерактивная карта в секции Contacts +8"),console.log("-Карта немного другая и маркеры маленькие"),console.log("Добавления: Плэйлист в видео плеере с фиксацией просмотренного контента. +10 баллов"),console.log("Добавления: Всплытие заголовков при пролистывании +4 балла."),console.log("Итого: 160 баллов с учётом недочётов и доп.материала.")})()})();