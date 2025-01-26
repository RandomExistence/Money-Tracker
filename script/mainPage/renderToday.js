import { 
  productToday, addProductToArray, removeProductFromArray, updateProductArray,
  dailyEarn, yesterdayMonthTotal, monthMaxTotal
} from "./moneyLogic.js";
import { today } from "./dateTimeLogic.js";
import { formatDate } from "../utils/dateFormat.js"

export function renderProductPriceGrid() {
  let gridHTML = ``;
  productToday.forEach((productDetail, index) => {
    gridHTML += `
      <div class="product-value js-product-value-${index}">${productDetail.name}</div>
      <div class="price-value js-price-value-${index}">${productDetail.price}</div>
      <button class="main-button third-column js-edit-button" data-index="${index}">edit</button>
    `;
  });

  gridHTML += `
    <input class="main-input js-add-product-input">
    <input class="main-input js-add-price-input">
    <button class="main-button third-column js-add-button">add</button>
  `;

  document.querySelector('.js-product-price-gird').innerHTML = gridHTML;

  document.querySelector('.js-add-button').addEventListener('click', () => {
    const product = document.querySelector('.js-add-product-input').value;
    const price = Number(document.querySelector('.js-add-price-input').value);
    if ( price < 0 || !price || !product) {
      alert(`Fill in both product and price with valid values`);
    } else {
      addProductToArray(product, price);
      renderTodayTotal();
      renderMonthTotal();
      renderProductPriceGrid();
    }
  });

  console.log(productToday);

  document.querySelectorAll('.js-edit-button').forEach((button) => {
    button.addEventListener('click', () => {
      const product = document.querySelector(`.js-product-value-${button.dataset.index}`);
      const price = document.querySelector(`.js-price-value-${button.dataset.index}`);
      product.outerHTML = `
        <input class="main-input js-product-input" value="${product.innerHTML}">
      `;
      price.outerHTML = `
        <input class="main-input js-price-input" value="${Number(price.innerHTML)}">
      `;
      
      button.outerHTML = `
        <button class="main-button third-column js-save-button">save</button>
      `;

      document.querySelectorAll('.js-edit-button').forEach((button) => {
        button.outerHTML = `
          <div class="third-column"></div>
        `;
      });

      document.querySelector('.js-save-button').addEventListener('click', () => {
        const inputProduct = document.querySelector('.js-product-input').value;
        const inputPrice = Number(document.querySelector('.js-price-input').value);
        if (inputPrice === 0) {
          removeProductFromArray(button.dataset.index);
          renderTodayTotal();
          renderMonthTotal();
          renderProductPriceGrid();
        } else if (inputPrice < 0 || !inputPrice || !inputProduct) {
          alert('Fill in both product and price with valid values, leave price field as blank or 0 for deletion');
        } else {
          updateProductArray(button.dataset.index, inputProduct, inputPrice);
          renderTodayTotal();
          renderMonthTotal();
          renderProductPriceGrid();
        }
      });
    });
  });
}

export function renderTodayTotal() {
  let total = 0;
  productToday.forEach((product) => {
    total += product.price;
  });

  document.querySelector('.js-today-total-value').innerHTML = `
    <span class="js-today-total-span">${total}</span> / ${dailyEarn}
    <div class="tomorrow-daily-earn">(tmr. +${dailyEarn}) </div>
  `;
  if (total > dailyEarn) {
    document.querySelector('.js-today-total-span').classList.add('today-total-exceed-span');
  }
}

export function renderMonthTotal() {
  /*
  2 ways,
  1 : make a variable keeping the tally
  2 : make an array keeping the product
  */
 // is debatable for whether you wanna change it or not
  let todayTotal = 0;
  productToday.forEach((product) => {
    todayTotal += product.price;
  });
  const currentMonthTotal = yesterdayMonthTotal + todayTotal;
  document.querySelector('.js-month-total-value').innerHTML = `
    ${currentMonthTotal} / ${monthMaxTotal}
  `
}

export function renderLoginMonthTotal() {
  document.querySelector('.js-total-login-month').innerHTML = `
     ${yesterdayMonthTotal} / ${monthMaxTotal}
  `
  document.querySelector('.js-daily-earn-div').innerHTML = `
    You will be given ${dailyEarn} Baht
  `
}

export function renderDisplayDate() {
  document.querySelector('.js-display-date').innerHTML = `
    ${formatDate(today)}
  `;
}

