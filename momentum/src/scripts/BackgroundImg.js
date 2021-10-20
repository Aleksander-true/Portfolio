import { getTimeOfDay } from "./TimeAndDate";

const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
const btnNext = document.querySelector('.slide-next')
const btnPrev = document.querySelector('.slide-prev')
let photos;
let photoNumber;
let isSliderOn = false; 
getLinks()


async function getLinks() {
  const api_key = 'dec87a841a63127676ff371d3a9b2da5';
  const tags = `nature,${getTimeOfDay()}`
  const extras = `url_h`
  const format='json';
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&extras=${extras}&format=${format}&nojsoncallback=1`

  let response = await fetch(url);
  let data = await response.json();
  let count = 0;
  photos = data.photos.photo.filter( photo => {
    if (photo.url_h && count < 20) {
      count ++;
      return true
    }
  }) 
  photoNumber = Math.round(Math.random()*20);
  changeSlide();
}

btnNext.addEventListener('click', slideNext)
btnPrev.addEventListener('click', slidePrev)

function slideNext() {
  if (isSliderOn) {
    photoNumber = (photoNumber + 1) % 20; 
    changeSlide()
  }
}

function slidePrev() {
  if (isSliderOn) {
    photoNumber = (photoNumber + 19) % 20; 
    changeSlide()
  }
}

function changeSlide() { 
  isSliderOn = false;
  let img = document.createElement('img');
  img.src = photos[photoNumber].url_h;
  img.onload = () => {
    body.style.backgroundImage =  `url("${photos[photoNumber].url_h}")`;
    img.remove();
    isSliderOn = true;
  } 
}