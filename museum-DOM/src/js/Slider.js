import { createElement } from "./CreateElement";
import {switchVideo, videoPauseHandler} from './VideoPlayer';
import {stopVideo} from './IframeChanger';

class Slider {
  constructor({classOfWrapper, firstSlideClass, isControlled = true, isAutoPlay = false, callbackFnc = ()=>{}} ) {
    this.callback = callbackFnc;
    this.wrapper =  document.querySelector(`.${classOfWrapper}`);
    this.container = this.wrapper.querySelector(`.${classOfWrapper}__container`);
    this.slideClass = firstSlideClass;
    this.slidersArray = this.container.querySelectorAll(`.${firstSlideClass}`);

    this.slideWidth = this.slidersArray[0].offsetWidth;
    //console.log('this.slidersArray[0]=',this.slidersArray[0], 'this.slideWidth=',this.slideWidth)
    if (isControlled) {
      this.initPanel();
      this.turnSliderOn();
    }
    this.initSlider();
  }

  initSlider() {
    this.isReadySlide = true;

    this.qtySlides = this.slidersArray.length;
    this.currentSlide = 0;
    this.slideEnded();
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
    this.slideOut();
  }

  slideLeft() {
    this.shift = -1;
    this.currentSlide--;
    this.currentSlide = (this.currentSlide + this.qtySlides ) % this.qtySlides;
    this.slideOut();
  }

  slideOut() {
      this.isReadySlide = false;
      this.slidersArray = this.container.querySelectorAll(`.${this.slideClass}`);
      for (let i=0; i<this.shift ; i++) {
        let clone = this.slidersArray[(i+this.currentSlide-this.shift+this.qtySlides) % (this.qtySlides-1)].cloneNode()
        clone.style.order = i + this.qtySlides;
        this.container.append(clone)
      }
      this.container.style.transitionProperty = 'left'
      this.container.style.left = `-${(this.shift+1)*this.slideWidth}px`;
      if (this.panelCounter) this.panelCounter.innerHTML = (this.currentSlide+1 < 10) ? `0${this.currentSlide+1}`: `${this.currentSlide+1}`;
      this.panelBullets.forEach( bullet => {
        if (bullet.dataset.slideNumber == this.currentSlide) {
          bullet.classList.add('panel__bullet_marked');
        } else {
          bullet.classList.remove('panel__bullet_marked');
        }
      });
      this.callback(this.currentSlide);
  }

  slideEnded() {
    this.slidersArray = this.container.querySelectorAll(`.${this.slideClass}`);
    for (let i=0; i<this.shift; i++) {
      this.slidersArray[i+this.qtySlides].remove();
    }
    for (let i=0; i<this.qtySlides ; i++) {
      this.slidersArray[i].style.order = `${(i-this.currentSlide-1+this.qtySlides) % this.qtySlides}`
    }
    this.container.style.transitionProperty = 'none'
    this.container.style.left = `-${this.slideWidth}px`;
    this.isReadySlide = true;
  }

  panelHandler(e) {
    this.shift = e.target.dataset.slideNumber - this.currentSlide;
    this.currentSlide = +e.target.dataset.slideNumber;
    if (this.shift < -1) {this.shift = this.shift + this.qtySlides}
    this.slideOut();
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
const videoSlider = new Slider ({classOfWrapper:'video-journey__slider', firstSlideClass: 'iframe-slide', callbackFnc: playFirstSlide});

function playFirstSlide(videoNumber) {
  videoPauseHandler();
  switchVideo(videoNumber);
  stopVideo();
}
