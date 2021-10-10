const buyTicketBtn = document.querySelector('.buy-ticket .button_small');
const bookingModal = document.querySelector('.booking');
const bookingCloseCross = document.querySelector('.booking__close-cross');
const bookingSection = document.querySelector('.booking > .section');

buyTicketBtn.addEventListener('click', () => {
  bookingModal.classList.add('booking__arrive');
  bookingSection.classList.add('booking__arrive');
})


bookingCloseCross.addEventListener('click', ()=> {
  bookingSection.classList.remove('booking__arrive');
})

bookingModal.addEventListener('click', (e) => {
  //console.log(e)
  if (e.target.classList.contains('booking')) {
    bookingSection.classList.remove('booking__arrive');
  }
})

bookingSection.addEventListener('transitionend', ()=> {
  //console.log("transitionend")
  if (!bookingSection.classList.contains('booking__arrive')) {
    bookingModal.classList.remove('booking__arrive')
  }
})


