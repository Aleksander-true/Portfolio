let upBtn = document.querySelector('.up-button');
let downBtn = document.querySelector('.down-button');


upBtn.addEventListener('click', slideUp);
downBtn.addEventListener('click', slideDown);



function slideUp() {
  upBtn.removeEventListener('click', slideUp);

  let slideRight = document.querySelector('.right-slide');
  let slidersImg = document.querySelectorAll('.right-slide > div');
  let newRightSlide = slidersImg[slidersImg.length-1].cloneNode();
  slideRight.prepend(newRightSlide);
  slidersImg[slidersImg.length-1].style.top = "-100%";

  let slideLeft = document.querySelector('.left-slide');
  let slidersTxts = document.querySelectorAll('.left-slide > div');
  let newLeftSlide = slidersTxts[slidersTxts.length-1].cloneNode(true);
  slideLeft.prepend(newLeftSlide);
  slidersTxts[slidersTxts.length-1].style.top = "100%";
  console.log(slidersTxts[slidersTxts.length-1]);

  setTimeout (()=>{
    upBtn.addEventListener('click', slideUp);
    slidersImg[slidersImg.length-1].remove();
    slidersTxts[slidersTxts.length-1].remove();
  }, 500);
    
}

function slideDown () {
  downBtn.removeEventListener('click', slideDown);
  let slidersImg = document.querySelectorAll('.right-slide > div');
  let lastSlide =  slidersImg[slidersImg.length-1];
  let newLastSlide = lastSlide.cloneNode();
  lastSlide.before(slidersImg[0]);  
  lastSlide.style.top = "100%";
  slidersImg[0].before(newLastSlide); 

  let slidersTxts = document.querySelectorAll('.left-slide > div');
  let lastSlideTxt =  slidersTxts[slidersImg.length-1];
  let newTxtSlide = lastSlideTxt.cloneNode(true);

  lastSlideTxt.before(slidersTxts[0]);  
  lastSlideTxt.style.top = "-100%";
  slidersTxts[0].before(newTxtSlide); 

  setTimeout (()=>{
    downBtn.addEventListener('click', slideDown);
    slidersImg = document.querySelectorAll('.right-slide > div');
    lastSlide.remove();
    lastSlideTxt.remove();
  }, 500);

}

