import { state } from "./TimeAndDate";

const quote = document.querySelector('#quote')
const author = document.querySelector('#author')
const change = document.querySelector('#change-quote')


getQuotes();

async function getQuotes() {  
  let lang = state.language;
  const url = '../assets/Quotes.json';
  const res = await fetch(url);
  const data = await res.json(); 
  
  let quoteNumber = Math.round(Math.random()*19)
  quote.textContent = data[quoteNumber][`text-${lang}`]
  author.textContent = data[quoteNumber][`author-${lang}`]
}
change.addEventListener('click', getQuotes)

export {getQuotes}