const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const slider = document.querySelector('.slider-container');
let dragDirection = '';
const minDragLength = slider.clientHeight * 0.2;
let mouseStartCoordinate = { x:0, y:0 };
let mouseEndCoordinate = {x:0, y:0};
slider.setAttribute('tabindex', '-1');

addServiceElements();
turnSlider('on');
turnTransition('on');

function slide (direction) {
  turnSlider('off');
  const slideRight = document.querySelector('.right-slide');
  const slideLeft = document.querySelector('.left-slide');
  const slidersImg = document.querySelectorAll('.right-slide > div');
  const slidersTxt = document.querySelectorAll('.left-slide > div');

  if (direction === 'up') { 
    slideRight.lastElementChild.after(slidersImg[1].cloneNode());
    slidersImg[1].style.height = "0";
    slideLeft.firstElementChild.style.height = '100%'
  } else { 
    slideLeft.lastElementChild.after(slidersTxt[1].cloneNode(true));
    slidersTxt[1].style.height = "0"; 
    slideRight.firstElementChild.style.height = '100%';
  };
  
  setTimeout (()=>{ 
    const emptyDiv = document.createElement('div');
      emptyDiv.classList.add('empty-div','transition');
    if (direction ==='up') {
        slideLeft.firstElementChild.replaceWith(slideLeft.lastElementChild);
        slideLeft.prepend(emptyDiv);
        slidersImg[1].remove();
    } else {
        slidersTxt[1].remove();
        slideRight.firstElementChild.replaceWith(slideRight.lastElementChild);
        slideRight.prepend(emptyDiv);
    }
    turnSlider('on');
    }, 500);  
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

function slideUp() { slide('up') };
function slideDown() { slide('down')};

function addServiceElements() {
  const slideRight = document.querySelector('.right-slide');
  const slideLeft = document.querySelector('.left-slide');
  slideRight.prepend(slideRight.lastElementChild);
  slideRight.prepend(document.createElement('div'));
  
  const slidersImg = document.querySelectorAll('.right-slide > div');
  slidersImg[0].className = 'empty-div'; 
  
  slideLeft.prepend(slideLeft.lastElementChild);
  slideLeft.prepend(document.createElement('div'));
  const slidersTxt = document.querySelectorAll('.left-slide > div');
  slidersTxt[0].className = 'empty-div'; 
}

function wheelSlider(event) {
  if (event.deltaY<0) { slideUp() 
  } else { slideDown() }1
}

function pressArrowKey (key) {
  key.preventDefault();
  console.log(key.code);
  if (key.code == "ArrowUp") { slide('up') } 
  if (key.code == "ArrowDown") { slide('down') } 
}

function mouseStartSwipe(e) {
  turnTransition('off');
  const slideRight = document.querySelector('.right-slide');
  if (e.which == 1) {
    let field = slider.getBoundingClientRect();
    let rightField = slideRight.getBoundingClientRect();

    mouseStartCoordinate = {x:e.pageX , y:e.pageY };

    if (e.pageX >= rightField.left ) {dragDirection = 'draggingRight'}
    else {dragDirection ='draggingLeft'};

    if (e.pageX >= field.left && e.pageX <= field.right && e.pageY >= field.top && e.pageY <= field.bottom) {
      document.addEventListener('pointermove', dragSlide);
    }
  }
}

function mouseEndSwipe (e) {
  mouseEndCoordinate = {x:e.pageX , y:e.pageY }
  document.removeEventListener('pointermove', dragSlide)
  dragLength = mouseEndCoordinate.y - mouseStartCoordinate.y;
  turnTransition('on');
  cancelDragOffset();
  if (Math.abs(dragLength) >= minDragLength) {
    if ((dragLength > 0 && dragDirection == "draggingRight")  || (dragLength <= 0 && dragDirection == "draggingLeft")  ) { slideDown() }
    else (slideUp());
  }

}

function cancelDragOffset () {
  const slidersImg = document.querySelectorAll('.right-slide > div');
  const slidersTxt = document.querySelectorAll('.left-slide > div');
  slidersImg[0].style.height = '0'; 
  slidersTxt[1].style.height = '100%'; 
  slidersTxt[0].style.height = '0';  
  slidersImg[1].style.height = '100%';
}

function dragSlide(e) {
  e.preventDefault();
  const slidersImg = document.querySelectorAll('.right-slide > div');
  const slidersTxt = document.querySelectorAll('.left-slide > div');
  let trek = e.pageY - mouseStartCoordinate.y;
if (dragDirection === 'draggingLeft') { trek = -trek};

  if (trek >= 0) {
    slidersImg[0].style.height = trek +'px';
    slidersTxt[1].style.height = slider.clientHeight - trek +'px';
  } else {
    slidersTxt[0].style.height = -trek +'px';
    slidersImg[1].style.height = slider.clientHeight - -trek +'px';
  }
} 

function turnTransition(str) {
  const slidersImg = document.querySelectorAll('.right-slide > div');
  const slidersTxt = document.querySelectorAll('.left-slide > div');
  if (str == 'on') {
    slidersImg.forEach(element=>element.classList.add('transition'));
    slidersTxt.forEach(element=>element.classList.add('transition'));
  } else {
    slidersImg.forEach(element=>element.classList.remove('transition'));
    slidersTxt.forEach(element=>element.classList.remove('transition'));  
  }
}

slider.ontouchmove = function () {
  return false
}
