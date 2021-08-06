let upBtn = document.querySelector('.up-button');
let downBtn = document.querySelector('.down-button'); 

addServiceElements()
turnButtons('on');

function slide (direction) {
  turnButtons('off');
  let slideRight = document.querySelector('.right-slide');
  let slidersImg = document.querySelectorAll('.right-slide > div');
  let firstRightSlide = slidersImg[2].cloneNode();
  let lastRightSlide = slidersImg[slidersImg.length-1];
  let slideLeft = document.querySelector('.left-slide');
  let slidersTxt = document.querySelectorAll('.left-slide > div');
  let firstLeftSlide = slidersTxt[2].cloneNode(true);
  let lastLeftSlide = slidersTxt[slidersTxt.length-1];

  if (direction === 'up') { 
    lastRightSlide.after(firstRightSlide);
    slidersImg[1].style.height = "0";

    slidersTxt[1].after(lastLeftSlide);
    slidersTxt[1].remove();
    slidersTxt[0].removeAttribute('class');
  }else{ 
    lastLeftSlide.after(firstLeftSlide);
    slidersTxt[1].style.height = "0"; 
    slidersImg[1].after(lastRightSlide);
    slidersImg[1].remove();
    slidersImg[0].removeAttribute('class');
  };
  
  setTimeout (()=>{ 
    let emptyDiv = document.createElement('div');
      emptyDiv.className = 'empty-div';
      
    if (direction ==='up') {
        slideLeft.prepend(emptyDiv);
        slidersImg[1].remove();
    } else {
        slidersTxt[1].remove();
        slideRight.prepend(emptyDiv);
    }
    turnButtons('on');
    }, 500);  
  } 

function turnButtons(str) {
  if (str === 'off') {
      upBtn.removeEventListener('click', slideUp);
      downBtn.removeEventListener('click', slideDown);
} else {
      upBtn.addEventListener('click', slideUp);
      downBtn.addEventListener('click', slideDown);
  }  
}

function slideUp () { slide('up') };
function slideDown () { slide('down')};

function addServiceElements() {
  let slideRight = document.querySelector('.right-slide');
  let slideLeft = document.querySelector('.left-slide');

  slideRight.prepend(document.createElement('div'));
  slideRight.prepend(document.createElement('div'));
  
  let slidersImg = document.querySelectorAll('.right-slide > div');
  slidersImg[0].className = 'empty-div'; 
  
  slideLeft.prepend(document.createElement('div'));
  slideLeft.prepend(document.createElement('div'));
  let slidersTxt = document.querySelectorAll('.left-slide > div');
  slidersTxt[0].className = 'empty-div'; 
}