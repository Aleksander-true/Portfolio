const buyTicketBtn = document.querySelector('.buy-ticket .button_small');
const bookingModal = document.querySelector('.booking');
const bookingCloseCross = document.querySelector('.booking__close-cross');
const bookingSection = bookingCloseCross.querySelector('.section');

buyTicketBtn.addEventListener('click', ()=> {
  bookingModal.style.display = 'block';
  bookingSection.classList.add(booking__arrive);
})




bookingCloseCross.addEventListener('click', ()=> {
  bookingModal.style.display = 'none';
  bookingSection.classList.remove(booking__arrive);
})



