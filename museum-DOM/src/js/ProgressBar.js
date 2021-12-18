const progress = document.querySelector('.video-wrapper__tool-bar');
 progress.addEventListener('input', inputProgressBar);

function inputProgressBar(event) {
  const value = event.target.value;
  event.target.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #e5e5e5 ${value}%, #e5e5e5 100%)`
 };
