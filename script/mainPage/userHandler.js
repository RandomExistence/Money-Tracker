import { today, recDay, updateRecDay, updateLastLoginDay, lastLoginDay } from "./dateTimeLogic.js";
import { setUpButton } from "../utils/setters.js";
import { formatDate } from "../utils/dateFormat.js";
import { updateYesterdayMonthTotal, updateMonthMaxTotal, removeProductTodayArray } from "./moneyLogic.js";
import { renderLoginMonthTotal, renderTodayTotal, renderMonthTotal, renderProductPriceGrid, renderDisplayDate } from "./renderToday.js";
import { addProductHistoryMaxPrice, appendProductHistory, transferProductTodayToProductHistory } from "../history/historyLogic.js";

let loggedIn = JSON.parse(localStorage.getItem('loggedIn')) || false;
setUpButton();
renderDisplayDate();
document.querySelector('.js-last-login-day').innerHTML = `
  ${formatDate(lastLoginDay)}
`;

if (recDay.getMonth() != today.getMonth()) {
  console.log(`today: ${today}`);
  console.log(`recDay ${recDay}`);
  console.log(`lastLoginDay ${lastLoginDay}`);
  // regular case
  updateYesterdayMonthTotal();
  transferProductTodayToProductHistory();
  removeProductTodayArray();
  renderLoginMonthTotal();
  updateRecDay();
  // special thing to do for new month
  appendProductHistory();
}

if (recDay.getDate() != today.getDate()) {
  console.log('days are not the same');
  document.querySelector('.js-main-body-div').classList.add('hidden');
  document.querySelector('.js-login-body-div').classList.remove('hidden');
  updateYesterdayMonthTotal();
  transferProductTodayToProductHistory();
  removeProductTodayArray();
  renderLoginMonthTotal();
  updateRecDay();
  loggedIn = false;
  localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
}

// set up the yes button
document.querySelector('.js-login-yes-button').addEventListener('click', () => {
  console.log('you have entered Money Tracker');
  document.querySelector('.js-login-body-div').classList.add('hidden');
  document.querySelector('.js-main-body-div').classList.remove('hidden');
  console.log(recDay);
  loggedIn = true;
  localStorage.setItem('loggedIn', JSON.stringify(loggedIn));
  try {
    addProductHistoryMaxPrice();
    updateMonthMaxTotal();
    updateLastLoginDay();
    renderProductPriceGrid();
    renderMonthTotal();
    renderTodayTotal();
  } catch (error) {
    console.log(error);
  }
});

if (!loggedIn) {
  console.log('not logged in');
  console.log(recDay);
  document.querySelector('.js-main-body-div').classList.add('hidden');
  document.querySelector('.js-login-body-div').classList.remove('hidden');
  renderLoginMonthTotal();
} else {
  document.querySelector('.js-login-body-div').classList.add('hidden');
  document.querySelector('.js-main-body-div').classList.remove('hidden');
  localStorage.setItem('recDay', today.toISOString());
  console.log(lastLoginDay);
  console.log(recDay);
  console.log(today);
  renderTodayTotal();
  renderMonthTotal();
  renderProductPriceGrid();
}
