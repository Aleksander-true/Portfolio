const wand = document.querySelector('.wand__donut');
const picBefore = document.querySelector('.picture-explore__img_before');
const container = document.querySelector('.picture-explore__container');


wand.addEventListener('pointerdown', () => {
  //e.preventDefault();
  container.addEventListener('mousemove', move)
})

document.addEventListener('pointerup', stopMove);

function move(e) {
  e.preventDefault();
  let conteinerWidth = container.offsetWidth;
  let offset = container.getBoundingClientRect().left;
  let width = e.clientX - offset;
  if (width >=0 && width <= conteinerWidth) {
    picBefore.style.width = `${width}px`
  }
  if (e.clientX > offset + conteinerWidth + 10  || e.clientX < offset -10 ) stopMove();
 }

 function stopMove() {
  container.removeEventListener('mousemove', move)
 }

