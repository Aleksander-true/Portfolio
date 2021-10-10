const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
     if (entry.isIntersecting) {
      entry.target.classList.add('section_visible');
     }
   });
 });

 observer.observe(document.querySelector('.title'));
 observer.observe(document.querySelector('.virtual-tour .title'));
 observer.observe(document.querySelector('.video-journey .title'));
 observer.observe(document.querySelector('.picture-explore .title'));
 observer.observe(document.querySelector('.buy-ticket .title'));
 observer.observe(document.querySelector('.contacts .title'));
