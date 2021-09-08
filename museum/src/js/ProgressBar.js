const progress = document.querySelector('.video-wrapper__tool-bar');
 progress.addEventListener('input', inputProgressBar);

function inputProgressBar(event) {
  const value = event.target.value;
  event.target.style.background = `linear-gradient(to right, #24809e 0%, #24809e ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`
 };
