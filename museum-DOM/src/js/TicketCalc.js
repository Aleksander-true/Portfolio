const buyTickets = document.querySelector('.buy-ticket');
const permanentExh = document.getElementById('permanent-exhibition');
const temporaryExh = document.getElementById('temporary-exhibition');
const combinedExh = document.getElementById('combined-admission');
const basicAmount = document.getElementById('ticket-form__amount-number_basic');
const seniorAmount = document.getElementById('ticket-form__amount-number_senior');
const calculation = document.getElementById('ticket-form__calculation');

const bookingForm = document.forms.booking
const bookingBasic =  document.forms.booking.basic
const bookingSenior =  document.forms.booking.senior
const bookingType =  document.forms.booking.type
const basicQty =  document.querySelector('.overview__qty_basic');
const seniorQty =  document.querySelector('.overview__qty_senior');
const totalCost = document.querySelector('.overview__total');
const overviewType = document.querySelector('.overview__received_type');
const basicSum = document.querySelector('.overview__sum_basic');
const seniorSum = document.querySelector('.overview__sum_senior');

const basicCosts = document.querySelectorAll('.entry-ticket__text_basic');
const seniorCosts = document.querySelectorAll('.entry-ticket__text_senior');


let ticketType = localStorage.getItem('ticket-type');
ticketTypeRoutine();

if (localStorage.getItem('basicAmount')) basicAmount.value = localStorage.getItem('basicAmount');
if (localStorage.getItem('seniorAmount')) seniorAmount.value = localStorage.getItem('seniorAmount');

changeTickets();

buyTickets.addEventListener('click', changeTickets)
bookingForm.addEventListener('click', changeBooking);


function changeTickets() {
  if (permanentExh.checked) {ticketType = 'permanent'  };
  if (temporaryExh.checked) {ticketType = 'temporary' };
  if (combinedExh.checked)  {ticketType = 'combined' };

  bookingBasic.value = basicAmount.value;
  bookingSenior.value = seniorAmount.value;
  bookingType.value = ticketType;

  preCalculate()
  changeBooking()
  }

function preCalculate() {
  ticketTypeRoutine();

  basicSum.value = ticketCost * +basicAmount.value;
  seniorSum.value = ticketCost * +seniorAmount.value * 0.5;

  calculation.value = +basicSum.value + +seniorSum.value;
  totalCost.value = calculation.value;

  if (String(calculation.value).length >= 4 ) {
    calculation.style.width = '90px'
    totalCost.style.width = '90px'
  } else if (String(calculation.value).length >= 3 ) {
    calculation.style.width = '70px'
    totalCost.style.width = '70px'
  } else {
    totalCost.style.width = '45px'
    }
}

function changeBooking() {
  console.log('calculate')
  basicQty.value = bookingBasic.value
  seniorQty.value = bookingSenior.value
  basicAmount.value = bookingBasic.value
  seniorAmount.value = bookingSenior.value
  ticketType = bookingType.value



  saveChoice()
  preCalculate()
}

function ticketTypeRoutine() {
  switch (ticketType) {
    case 'combined':
      combinedExh.checked = true;
      ticketCost = combinedExh.value;
      overviewType.textContent = 'Combined Admissionn';
      break;
    case 'temporary':
      temporaryExh.checked = true;
      ticketCost = temporaryExh.value;
      overviewType.textContent = 'Temporary exhibition'
      break;
    case 'permanent':
    default:
      permanentExh.checked = true;
      ticketCost = permanentExh.value;
      overviewType.textContent = 'Permanent exhibition'
      break;
  }
  basicCosts.forEach ( element => {
    element.textContent = `Basic (${ticketCost}€)`
  } )
  seniorCosts.forEach ( element => {
    element.textContent = `Senior (${ticketCost/2}€)`
  } )

}

function saveChoice() {
  localStorage.setItem('basicAmount', basicQty.value);
  localStorage.setItem('seniorAmount', seniorQty.value);
  localStorage.setItem('ticket-type', bookingType.value )
}

