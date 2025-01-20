import { 
  renderProductPriceGrid, renderTodayTotal, updateMonthMaxAndYesterday, 
  renderMonthTotal, renderLoginMonthTotal, removeProductTodayArray, 
  productToday, setUpButton
} from "./spending.js";
import { formatDate } from "./utils/dateFormat.js";
import { updateProductHistory } from "./history/arrayLogic.js"; 

let today = new Date();
// brother, this is a fucking pointer, omfg
// let recDay = today;
let recDay = new Date();
if (!localStorage.getItem('recDay')) {
  recDay.setDate(today.getDate() - 1);
} else {
  recDay = new Date(localStorage.getItem('recDay'));
}

setUpButton();


if (recDay.getMonth() != today.getMonth()) {
  alert('new month');
  alert(`${recDay} and ${today}`);
  // update the history and month total
  // whether or not the user desire to login, it will update
}

if (recDay.getDate() != today.getDate()) {
  // this is stinky af, help I can't breathe
  document.querySelector('.js-main-body-div').classList.add('hidden');
  document.querySelector('.js-login-body-div').classList.remove('hidden');
  renderLoginMonthTotal();
  console.log(productToday);
  console.log(recDay);
  console.log(today);
  document.querySelector('.js-login-date-record').innerHTML = `
    ${formatDate(recDay)}
  `

  document.querySelector('.js-login-yes-button').addEventListener('click', () => {
    console.log('you have entered Money Tracker');
    document.querySelector('.js-login-body-div').classList.add('hidden');
    document.querySelector('.js-main-body-div').classList.remove('hidden');
    console.log(recDay);
    localStorage.setItem('recDay', today.toISOString());
    try {
      updateMonthMaxAndYesterday();
      updateProductHistory();
      removeProductTodayArray();
      renderProductPriceGrid();
      renderMonthTotal();
      renderTodayTotal();
    } catch (error) {
      console.log(error);
    }
  });
  
} else {
  document.querySelector('.js-login-body-div').classList.add('hidden');
  localStorage.setItem('recDay', today.toISOString());
  console.log(recDay);
  console.log(today);
  renderTodayTotal();
  renderMonthTotal();
  renderProductPriceGrid();
}


function updateDisplayDate() {
  document.querySelector('.js-display-date').innerHTML = `
    ${formatDate(today)}
  `;
}

updateDisplayDate();