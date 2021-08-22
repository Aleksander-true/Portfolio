console.log('Реализованный функционал:');
console.log('1) Бесконечный слайдер');
console.log('2) Пролистывание колёсиком мышки');
console.log('3) Пролистывание свайпами мышки');
console.log('4) Пролистывание кнопками клавиатуры вверх и вниз');
console.log('Доработан внешний');

const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const slidersQty = document.querySelectorAll('.right-slides__slide').length;
const slider = document.querySelector('.slider-container');
const rightSlides = document.querySelectorAll('.right-slides__slide');
const leftSlides = document.querySelectorAll('.left-slides__slide');

const minDragLength = slider.clientHeight * 0.1;
let currentSlide = slidersQty-1; 
let previousSlide = 0;
let nextSlide = 0;
let timerID;

let mouseStartCoordinate = 0;
let mouseEndCoordinate = 0;

slider.addEventListener('transitionend', transitionEnd);
slider.setAttribute('tabindex', '-1');

turnTransition('on');
turnSlider('on');
updateSlideNumbers();
updateSlidesClasses();

function updateSlideNumbers() {
  if (currentSlide >= slidersQty) {currentSlide = 0 }  
  if (currentSlide < 0) {currentSlide = slidersQty-1 }  

  if (currentSlide-1 < 0) {previousSlide = slidersQty-1}
  else {previousSlide = currentSlide-1}

  if (currentSlide+1 >= slidersQty) {nextSlide = 0}
  else {nextSlide = currentSlide+1}
}

function slideUp() {
  currentSlide++;
  updateSlideNumbers();
  updateSlidesClasses();
}

function  slideDown() {
  currentSlide--;
  updateSlideNumbers();
  updateSlidesClasses();
 
}

function transitionEnd() {
  turnSlider('on');
}

function updateSlidesClasses() {
  turnSlider('off');
  rightSlides.forEach(item=>item.classList.remove('current-slide','upper-slide','lower-slide'));
  rightSlides[currentSlide].classList.add('current-slide');
  rightSlides[previousSlide].classList.add('upper-slide');
  rightSlides[nextSlide].classList.add('lower-slide');

  leftSlides.forEach(item=>item.classList.remove('current-slide','upper-slide','lower-slide'));
  leftSlides[currentSlide].classList.add('current-slide');
  leftSlides[previousSlide].classList.add('lower-slide');
  leftSlides[nextSlide].classList.add('upper-slide');
  }
 
function turnSlider(str) {
  if (str === 'off') {
    upBtn.removeEventListener('click', slideUp );
    downBtn.removeEventListener('click', slideDown);
    slider.removeEventListener('wheel', wheelSlider);
    slider.removeEventListener('keydown', pressArrowKey);
    slider.removeEventListener('pointerdown', mouseStartSwipe);
    slider.removeEventListener('pointerup', mouseEndSwipe);
  } else {
    upBtn.addEventListener('click', slideUp);
    downBtn.addEventListener('click', slideDown);
    slider.addEventListener('wheel', wheelSlider);
    slider.addEventListener('keydown', pressArrowKey);
    slider.addEventListener('pointerdown', mouseStartSwipe);
    slider.addEventListener('pointerup', mouseEndSwipe);
    }  
  }

function turnTransition(str){
  if (str === 'on') {
    rightSlides.forEach(e => e.classList.add('transition'));
    leftSlides.forEach(e => e.classList.add('transition'));
  } else {
    rightSlides.forEach(e => e.classList.remove('transition'));
    leftSlides.forEach(e => e.classList.remove('transition'));
  }
}   
 
function wheelSlider(event) {
  if (event.deltaY<0) { slideUp() 
  } else { slideDown() }
}

function pressArrowKey (key) {
  key.preventDefault();
  if (key.code == "ArrowUp") { slideUp() } 
  if (key.code == "ArrowDown") { slideDown() } 
}

function mouseStartSwipe(e) {
  if (e.which == 1) {
    let rightField = rightSlides[currentSlide].getBoundingClientRect();
    mouseStartCoordinate = {x:e.pageX , y:e.pageY };
    if (e.pageX >= rightField.left ) {dragDirection = 'draggingRight'}
    else {dragDirection ='draggingLeft'};
  }
}

function mouseEndSwipe (e) {
  mouseEndCoordinate = {x:e.pageX , y:e.pageY }
  dragLength = mouseEndCoordinate.y - mouseStartCoordinate.y;
  if (Math.abs(dragLength) >= minDragLength) {
    if ((dragLength > 0 && dragDirection == "draggingRight")  || (dragLength <= 0 && dragDirection == "draggingLeft")  ) { slideDown() }
    else (slideUp());
  }
}

slider.ontouchmove = function () {
  return false;
}

slider.onmousemove = function () {
  return false;
}
