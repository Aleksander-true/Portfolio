import { createElement } from "./CreateElement";

class Slider {
  constructor({classOfWrapper, firstSlideClass, shovedSlides = 1, isControlled = true, isAutoPlay = false} ) {

    this.wrapper =  document.querySelector(`.${classOfWrapper}`);
    this.container = this.wrapper.querySelector(`.${classOfWrapper}__container`);
    this.slideClass = firstSlideClass;

    this.slideWidth = 100 / shovedSlides;
    if (isControlled) {
      this.initPanel();
      this.turnSliderOn();
    }
    this.initSlider();
  }

  initSlider() {
    this.isReadySlide = true;
    this.slidersArray = this.container.querySelectorAll('.slider__slide');
    this.qtySlides = this.slidersArray.length;
    this.currentSlide = 0;
  }

  turnSliderOn() {
    this.panel.addEventListener('click', (e) => this.clickHandler(e));
    this.container.addEventListener('transitionend', (e) => this.slideEnded(e));
    this.wrapper.addEventListener('pointerdown', (e) => this.mouseStartSwipe(e));
    this.wrapper.addEventListener('pointerup', (e) => this.mouseEndSwipe(e));

    this.wrapper.ontouchmove = function () {
      return false;
    }

    this.wrapper.onmousemove = function () {
      return false;
    }
  }

  initPanel() {
    this.panel = this.wrapper.querySelector(`.slider__panel`);
    this.panelBullets = this.panel.querySelectorAll(`.panel__bullet`);
    this.panelCounter = this.panel.querySelector('.panel__counter_number');
    this.leftBtn = this.panel.querySelector('.left-button');
    this.rightBtn = this.panel.querySelector('.right-button');
    this.panelBullets.forEach( (bullet,i) => {
      bullet.dataset.slideNumber = i;
    })
  }

  clickHandler(e) {
    if (!this.isReadySlide) return;
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
    this.shift = 1
    this.currentSlide++;
    this.currentSlide = this.currentSlide % this.qtySlides;
    this.slideOut('right');
  }

  slideLeft() {
    this.shift = -1;
    this.currentSlide--;
    this.currentSlide = (this.currentSlide + this.qtySlides )% this.qtySlides;
    this.slideOut('left');
  }

  slideOut(direction = 'right') {
      this.isReadySlide = false;
      this.slidersArray = this.container.querySelectorAll(`.${this.slideClass}`);
      this.container.style.transitionProperty = 'left'

      if (direction == 'right') {
        for (let i=0; i<this.shift; i++) {
          this.container.append(this.slidersArray[i].cloneNode(true));
        }
      }
      this.container.style.left = `-${(this.shift+1)*this.slideWidth}%`;
      if (this.panelCounter) this.panelCounter.innerHTML = (this.currentSlide+1 < 10) ? `0${this.currentSlide+1}`: `${this.currentSlide+1}`;
      this.panelBullets.forEach( bullet => {
        if (bullet.dataset.slideNumber == this.currentSlide) {
          bullet.classList.add('panel__bullet_marked');
        } else {
          bullet.classList.remove('panel__bullet_marked');
        }
      });
  }

  slideEnded() {
    this.slidersArray = this.container.querySelectorAll(`.${this.slideClass}`);
    console.log(this.slidersArray[this.qtySlides-1])
    if (this.shift == -1 ) {
      this.container.prepend(this.slidersArray[this.qtySlides-1]);
    } else {
      for (let i=0; i<this.shift; i++) {
        this.slidersArray[i].remove();
      }
    }
    this.container.style.transitionProperty = 'none'
    this.container.style.left = `-${this.slideWidth}%`;
    this.isReadySlide = true;
  }

  panelHandler(e) {
    this.shift = e.target.dataset.slideNumber - this.currentSlide;
    this.currentSlide = +e.target.dataset.slideNumber;
    if (this.shift > 0) {this.slideOut('right') }
    if (this.shift == -1) {this.slideOut('left')}
    if (this.shift < -1) {
      this.shift = this.shift + this.qtySlides;
      this.slideOut('right');
    }
  }

  mouseStartSwipe(e) {
    if (e.which == 1 && this.isReadySlide) {
      this.mouseStartCoordinate = {x:e.pageX , y:e.pageY };
    }
  }

  mouseEndSwipe (e) {
    if (e.which == 1 && this.isReadySlide) {
    let mouseEndCoordinate = {x:e.pageX , y:e.pageY }
    let dragLength = mouseEndCoordinate.x - this.mouseStartCoordinate.x;
    let dragHeight = mouseEndCoordinate.y - this.mouseStartCoordinate.y;
    if (Math.abs(dragLength) >= 100 && Math.abs(dragHeight) < 100 ) {
      if (dragLength > 0 ) this.slideLeft();
      else this.slideRight();
      }
    }
  }
}

const welcomeSlider = new Slider ({classOfWrapper:'slider__wrapper', firstSlideClass: 'slider__slide'});

const videoSlider = new Slider ({classOfWrapper:'video-journey__slider', firstSlideClass: 'iframe-slide', shovedSlides: 3});



