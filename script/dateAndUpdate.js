import { renderProductPriceGrid, renderTodayTotal, updateMonthMaxAndYesterday, renderMonthTotal, renderLoginMonthTotal, removeProductTodayArray, productToday } from "./spending.js";
import { formatDate } from "./utils/dateFormat.js";

let today = new Date();
let recDay;
if (!localStorage.getItem('recDay')) {
  recDay = today;
} else {
  recDay = new Date(localStorage.getItem('recDay'));
}

document.querySelector('.view-history-button').addEventListener('click', () => {
  window.location.href = 'history.html';
});

if (recDay.getMonth() != today.getMonth()) {
  alert('new month');
  alert(`${recDay} and ${today}`);
  // update the history and month total
  // whether or not the user desire to login, it will update
}

if (recDay.getDate() != today.getDate()) {
  // this is stinky af, help I can't breathe
  document.querySelector('.js-main-body-div').classList.add('hide-main-body-div');
  document.querySelector('.js-login-body-div').classList.remove('hide-login-body-div');
  renderLoginMonthTotal();
  console.log(productToday);
  console.log(recDay);
  document.querySelector('.js-login-date-record').innerHTML = `
    ${formatDate(recDay)}
  `

  document.querySelector('.js-login-yes-button').addEventListener('click', () => {
    console.log('you have entered Money Tracker');
    document.querySelector('.js-login-body-div').classList.add('hide-login-body-div');
    document.querySelector('.js-main-body-div').classList.remove('hide-main-body-div');
    console.log(recDay);
    localStorage.setItem('recDay', today.toISOString());
    updateMonthMaxAndYesterday();
    updateProductHistory()
    removeProductTodayArray();
    renderProductPriceGrid();
    renderMonthTotal();
    renderTodayTotal();
  });
  
} else {
  document.querySelector('.js-login-body-div').classList.add('hide-login-body-div');
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