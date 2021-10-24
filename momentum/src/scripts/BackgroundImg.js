import { getTimeOfDay } from "./TimeAndDate";

const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
const btnNext = document.querySelector('.slide-next')
const btnPrev = document.querySelector('.slide-prev')
let photos = [];
let urlArchive = {unsplash: [], flickr: []}
let maxPhotoQty = 20;
let photoNumber = 0;
let autoImgChange;
let isSliderOn = false; 
const timeTag = ['night', 'morning', 'afternoon', 'evening'];

getLinks()

async function getLinks(source = 'github') {
  clearInterval(autoImgChange)
  console.log('source', source)
  photos = [];
  let api_key, tags, extras,format, url, orientation, response, data;
  switch (source) {
    case 'github':
      tags = timeTag[getTimeOfDay()]
      for (let i=1; i<=20; i++) {
        photos.push(`https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${tags}/${String(i).padStart(2,'0')}.jpg`)
      }
      break;
    case 'unsplash':
      api_key = 'af5Ad7xxQ5_kdj0tmATHfiOoO21RlGYPbuePYa98lzI';
      orientation = 'landscape'
      tags = `nature,${timeTag[getTimeOfDay()]}`
      url = `https://api.unsplash.com/photos?per_page=20&orientation=${orientation}&query=${tags}&client_id=${api_key}`;
      try {
        response = await fetch(url);
        data = await response.json();
        for (let i=0; i<20; i++) { 
          photos.push(data[i].urls.regular)
        }
        urlArchive.unsplash = photos;
      } catch(error) {
        console.log(error.message)
        photos = urlArchive.unsplash || photos;
      }
      console.log('photos unsplash', photos)
      break;
    case 'flickr':
    default:
      api_key = 'dec87a841a63127676ff371d3a9b2da5';
      tags = `nature,${timeTag[getTimeOfDay()]}`
      extras = `url_h`
      format='json';
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${api_key}&tags=${tags}&extras=${extras}&format=${format}&nojsoncallback=1`
      response = await fetch(url);
      data = await response.json();
      let count = 0;
      data.photos.photo.forEach( photo => {
        if (photo.url_h && count < maxPhotoQty) {
          count ++;
          photos.push(photo.url_h);
        }
      }) 
      break;
  }
  changeSlide(); 
  autoImgChange = setInterval(changeSlide, 10000);
}  

btnNext.addEventListener('click', slideNext)
btnPrev.addEventListener('click', slidePrev)

function slideNext() {
  if (isSliderOn) {
    photoNumber = (photoNumber + 1) % photos.length; 
    clearInterval(autoImgChange)
    changeSlide(photoNumber)
  }
}

function slidePrev() {
  if (isSliderOn) {
    photoNumber = (photoNumber + 19) % photos.length; 
    clearInterval(autoImgChange)
    changeSlide(photoNumber)
  }
}

function changeSlide(photoNumber = Math.round(Math.random()*photos.length)) { 
  isSliderOn = false;
  let img = document.createElement('img');
  img.src = photos[photoNumber];
  img.onload = () => {
    body.style.backgroundImage =  `url("${photos[photoNumber]}")`;
    img.remove();
    isSliderOn = true;
  } 
  
}

export {getLinks}