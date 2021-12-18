const observerImg = new IntersectionObserver(entries => {
  entries.forEach(entry => {
     if (entry.isIntersecting) {
      entry.target.classList.add('gallery-img_visible');
     }
   });
 });

let imgs = document.querySelectorAll('.gallery_img')
imgs.forEach( img => {
  observerImg.observe(img);
})

const lastImg = document.querySelector('.gallery__colomns')
const observerImgClean = new IntersectionObserver( () => {
  imgs.forEach(img => {
      img.classList.remove('gallery-img_visible');
   })
 });

 observerImgClean.observe(lastImg);
