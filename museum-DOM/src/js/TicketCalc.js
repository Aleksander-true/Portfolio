const buyTickets = document.querySelector('.buy-ticket');
const permanentExh = document.getElementById('permanent-exhibition');
const temporaryExh = document.getElementById('temporary-exhibition');
const combinedExh = document.getElementById('combined-admission');
const basicAmount = document.getElementById('ticket-form__amount-number_basic');
const seniorAmount = document.getElementById('ticket-form__amount-number_senior');
const calculation = document.getElementById('ticket-form__calculation');
//let ticketCost = permanentExh.value;

buyTickets.addEventListener('click', () => {
  if (permanentExh.checked) {ticketCost = permanentExh.value};
  if (temporaryExh.checked) {ticketCost = temporaryExh.value};
  if (combinedExh.checked)  {ticketCost = combinedExh.value};
  calculation.value = ticketCost * +basicAmount.value + ticketCost * +seniorAmount.value * 0.5;
  if (calculation.value >= 1000 ) {calculation.style.width = '90px'}
  else {calculation.style.width = '70px'}
  })





