let galleryImgs = document.querySelectorAll('.gallery_img');
const qty = galleryImgs.length-1;

galleryImgs.forEach( (img, i) => {
  let random = Math.ceil(Math.random() * qty);
  if (random == i) random = 0;
  img.before(galleryImgs[random]);
})


