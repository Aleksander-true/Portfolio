/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 550:
/***/ (() => {

const buyTicketBtn = document.querySelector('.buy-ticket .button_small');
const bookingModal = document.querySelector('.booking');
const bookingCloseCross = document.querySelector('.booking__close-cross');
const bookingSection = document.querySelector('.booking > .section');

buyTicketBtn.addEventListener('click', ()=> {
  bookingModal.classList.add('booking__arrive');
  bookingSection.classList.add('booking__arrive');
})


bookingCloseCross.addEventListener('click', ()=> {
  bookingSection.classList.remove('booking__arrive');
})

bookingModal.addEventListener('click', (e) => {
  //console.log(e)
  if (e.target.classList.contains('booking')) {
    bookingSection.classList.remove('booking__arrive');
  }
})

bookingSection.addEventListener('transitionend', ()=> {
  //console.log("transitionend")
  if (!bookingSection.classList.contains('booking__arrive')) {
    bookingModal.classList.remove('booking__arrive')
  }
})




/***/ }),

/***/ 243:
/***/ (() => {

const progress = document.querySelector('.video-wrapper__tool-bar');
 progress.addEventListener('input', inputProgressBar);

function inputProgressBar(event) {
  const value = event.target.value;
  event.target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`
 };


/***/ }),

/***/ 928:
/***/ (() => {

const buttons = document.querySelectorAll('.button_book')

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        const x = e.clientX
        const y = e.clientY

        const buttonTop = e.target.offsetTop
        const buttonLeft = e.target.offsetLeft

        const xInside = x - buttonLeft
        const yInside = y - buttonTop

        const circle = document.createElement('span')
        circle.classList.add('circle')
        circle.style.top = yInside + 'px'
        circle.style.left = xInside + 'px'

        this.appendChild(circle)

        setTimeout(() => circle.remove(), 500)
    })
})


/***/ }),

/***/ 854:
/***/ (() => {

let galleryImgs = document.querySelectorAll('.gallery_img');
const qty = galleryImgs.length-1;

galleryImgs.forEach( (img, i) => {
  let random = Math.ceil(Math.random() * qty);
  console.log(random);
  if (random == i) random = 0;
  img.before(galleryImgs[random]);
})




/***/ }),

/***/ 223:
/***/ (() => {

const buyTickets = document.querySelector('.buy-ticket');
const permanentExh = document.getElementById('permanent-exhibition');
const temporaryExh = document.getElementById('temporary-exhibition');
const combinedExh = document.getElementById('combined-admission');
const basicAmount = document.getElementById('ticket-form__amount-number_basic');
const seniorAmount = document.getElementById('ticket-form__amount-number_senior');
const calculation = document.getElementById('ticket-form__calculation');
let ticketCost = permanentExh.value;

buyTickets.addEventListener('click', function(event) {
  if (permanentExh.checked) {ticketCost = permanentExh.value};
  if (temporaryExh.checked) {ticketCost = temporaryExh.value};
  if (combinedExh.checked)  {ticketCost = combinedExh.value};
  calculation.value = ticketCost * 1.2 * +basicAmount.value + ticketCost * +seniorAmount.value;
  if (calculation.value >= 1000 ) {calculation.style.width = '90px'}
  else {calculation.style.width = '70px'}
  })





/***/ }),

/***/ 881:
/***/ (() => {

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
     if (entry.isIntersecting) {
      entry.target.classList.add('section_visible');
     }
   });
 });
 observer.observe(document.querySelector('.title'));
 observer.observe(document.querySelector('.virtual-tour .title'));
 observer.observe(document.querySelector('.video-journey .title'));
 observer.observe(document.querySelector('.picture-explore .title'));
 observer.observe(document.querySelector('.buy-ticket .title'));
 observer.observe(document.querySelector('.contacts .title'));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./js/ProgressBar.js
var ProgressBar = __webpack_require__(243);
// EXTERNAL MODULE: ./js/TicketCalc.js
var TicketCalc = __webpack_require__(223);
// EXTERNAL MODULE: ./js/TitleAnimation.js
var TitleAnimation = __webpack_require__(881);
;// CONCATENATED MODULE: ./js/CreateElement.js
function createElement (parentElement, tag, classElement='', bgImg='') {
  let newElement = document.createElement(tag);
  newElement.className = classElement;
  newElement.style.backgroundImage = `url('${bgImg}')`;
  parentElement.append(newElement);
}

;// CONCATENATED MODULE: ./js/Slider.js


class Slider {
  constructor(classOfContainer, firstSlideClass ) {

    this.container = document.querySelector(`.${classOfContainer} .slider__container`);
    this.slideClass = firstSlideClass;

    this.panel = document.querySelector(`.${classOfContainer} ~ .slider__panel`);
    this.leftBtn = this.panel.querySelector('.left-button');
    this.rightBtn = this.panel.querySelector('.right-button');

    this.qtySlides = 1;
    this.currentSlide = 0;

  }

  setSlidePaths(arr) {
    this.qtySlides = arr.length+1;
    arr.forEach(url => {
      createElement(this.container, 'div', this.slideClass, url);
    });
    this.slidersArray = this.container.querySelectorAll('.slider__slide');
    //console.log('this.currentSlide=', this.currentSlide)
    this.turnSliderOn();
    this.slideEnded();
  }

  turnSliderOn() {
    this.panel.addEventListener('click', (e) => this.clickHandler(e));
    this.container.addEventListener('animationend', (e) => this.slideEnded(e));
  }

  clickHandler(e) {
    if (e.target.classList.contains('left-button')) {
      this.slideLeft();
    }
    if (e.target.classList.contains('right-button')) {
      this.slideRight();
    }
    if (e.target.classList.contains('panel__bullet')) {
      this.panelHandler(e);
    }
  }

  slideRight() {
    let previousSlide = this.currentSlide;
    this.currentSlide++;
    if (this.currentSlide >= this.qtySlides) {this.currentSlide = 0};
    //console.log('currentSlide=', this.currentSlide);
    this.slideOut('from-right');
  }

  slideLeft() {
    let previousSlide = this.currentSlide;
    this.currentSlide--;
    if (this.currentSlide < 0) {this.currentSlide = this.qtySlides-1};
    //console.log('currentSlide=', this.currentSlide);
    this.slideOut('from-left');
  }

  slideOut(direction = 'from-right') {
    this.container.classList.add(`${direction}`);
  }



  slideEnded() {
    this.slidersArray.forEach((slide,index,arr) => {
      if (this.currentSlide == 0 && index == arr.length-1) {slide.style.order = '0'}
       else if (index >= this.currentSlide-1) {slide.style.order = `${index+1}` }
      else {slide.style.order = `${index + arr.length+1}`};
    });
    this.container.classList.remove(`from-right`,'from-left' );
  }

  panelHandler(e) {
  //  console.log (e)
  }
}

const welcomeSlide = new Slider ('slider__wrapper', 'slider__slide');
welcomeSlide.setSlidePaths(
  ['assets/img/welcome-slider/2.jpg',
  'assets/img/welcome-slider/3.jpg',
  'assets/img/welcome-slider/4.jpg',
  'assets/img/welcome-slider/5.jpg']);



// EXTERNAL MODULE: ./js/BookingModal.js
var BookingModal = __webpack_require__(550);
// EXTERNAL MODULE: ./js/Riple.js
var Riple = __webpack_require__(928);
// EXTERNAL MODULE: ./js/ShuffleImg.js
var ShuffleImg = __webpack_require__(854);
;// CONCATENATED MODULE: ./index.js











console.log("Самопроверка: ")
console.log("1) Вёрстка валидная +10 ")
console.log("2) Вёрстка семантическая +24 ")
console.log("   -<header>, <main>, <footer> ")
console.log("   -семь элементов  ")
console.log("   -только один заголовок <h1>")
console.log("   -семь заголовков <h2> ")
console.log("   -шесть заголовков <h3> + один в Book")
console.log("    -два элемента <nav> ")
console.log("    -три списка ul > li > a ")
console.log("    -тринадцать кнопок button + 5 в book")
console.log("    -три тега input type=radio")
console.log("    -два тега input type=number + в book")
console.log("    -два тега input type=range")
console.log("    -для всех элементов <img> указан обязательный атрибут alt")
console.log("3) Вёрстка соответствует макету +45 ")
console.log("4) Форма покупки билетов +22 ")
console.log("    -форма плавно выдвигается слева при открытии и плавно возвращается назад при закрытии. В открытом состоянии под формой есть полупрозрачный overlay, который занимает весь экран. Форма и overlay прокручиваются вместе со страницей")
console.log("    -форма открывается при клике по кнопке Buy Now в секции Tickets и закрывается кликом по иконке с крестиком в верхнем правом углу или кликом по overlay")
console.log("    -при вёрстке формы используются следующие элементы: form, input type=date, input type=time, input type=text, input type=emai, input type=tel, input type=number, select")
console.log("    -вёрстка формы соответствует макету")
console.log("5) Требования к css + 18")
console.log("    -добавлен favicon ")
console.log("    -для построения сетки используются флексы или гриды ")
console.log("    -при уменьшении масштаба страницы браузера вёрстка размещается по центру")
console.log("    -фоновый цвет каждого блока и секции тянется на всю ширину страницы ")
console.log("    -иконки добавлены в формате .svg")
console.log("    -расстояние между буквами, там, где это требуется по макету, регулируется css-свойством letter-spacing")
console.log("    -переключаются радиокнопки в блоке Tickets")
console.log("    -в блоке Contacts правильно указанны ссылки на почту mailto и на телефон tel")
console.log("    -в футере добавлены ссылки на соцсети")
console.log("6) Интерактивность, реализуемая через css +23")
console.log("    -плавная прокрутка по якорям")
console.log("    -параллакс")
console.log("    -при кликам по кнопке Discover the Louvre и карточкам секции Visiting")
console.log("    -изменение стиля интерактивных элементов при наведении и клике  ")
console.log("7) Интерактивность, реализуемая через js +16")
console.log("    -можно передвигать ползунки громкости и прогресс-бар видео")
console.log("    -кликами по кнопкам + и - в секции Tiskets можно менять количество билетов Basic и Senior от 0 до 20")
console.log("    -при перезагрузке (обновлении) страницы картины в блоке Galery отображаются в рандомном порядке ")
console.log("ИТОГО: 158 баллов")





})();

/******/ })()
;