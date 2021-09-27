import { createElement } from "./CreateElement";

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


