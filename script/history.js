import { formatMonth } from "./utils/dateFormat.js";
import { productToday ,  dailyEarn } from "./spending.js"

let productHistory = JSON.parse(localStorage.getItem('productHistory')) || [
  {
    date: 'Jan 2025',
    totalPrice: 0,
    maxPrice: 0,
    thisMonthHistory: []
  },
  {
    date: 'Dec 2024',
    totalPrice: 30,
    maxPrice: 100,
    thisMonthHistory: [
      // would be nice if we could make it a class, you know to make it more concise
      {
        name: 'fish',
        price: 20
      },
      {
        name: 'eraser',
        price: 10
      }
    ]
  },
  {
    date: 'Nov 2024',
    totalPrice: 40,
    maxPrice: 120,
    thisMonthHistory: [
      // would be nice if we could make it a class, you know to make it more concise
      {
        name: 'fish',
        price: 20
      },
      {
        name: 'pencil',
        price: 20
      }
    ]
  },
];

document.querySelector('.js-return-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});

function renderHistory() {
  let historyMainHTML = '';

  productHistory.forEach((monthHistory, index) => {
    historyMainHTML += `
      <button class="expand-button js-expand-button" data-index="${index}">expand</button>
      <div class="record-date">${monthHistory.date}</div>
      <div class="record-value">${monthHistory.totalPrice} / ${monthHistory.maxPrice}</div>
      <div class="expand-month-history hidden js-expand-month-history-${index}" data-rendered="false"></div>
      <br>
    `;
  });
  document.querySelector('.js-main-history-body-div').innerHTML = historyMainHTML;

  document.querySelectorAll('.js-expand-button').forEach((button) => {
    button.addEventListener('click', () => {
      // expand the history
      toggleHistoryExpand(Number(button.dataset.index));
    });

  });
}

// not new month, the first element is off our concern
export function updateProductHistory() {
  let yesterdayTotal = 0;
  productToday.forEach((product) => {
    productHistory[0].thisMonthHistory.add({
      name: product.name,
      price: product.price
    });
    yesterdayTotal += product.price;
  });
  productHistory[0].totalPrice += yesterdayTotal;
  productHistory[0].maxPrice += dailyEarn;
  localStorage.setItem('productHistory', JSON.stringify(productHistory));
}

// new month
export function appendProductHistory() {

}

function toggleHistoryExpand(index) {
  const thisGrid =  document.querySelector(`.js-expand-month-history-${index}`);
  const isRendered = thisGrid.dataset.rendered;
  console.log(isRendered);
  if (!thisGrid.classList.contains('hidden')) {
    thisGrid.classList.add('hidden');
    return;
  }
  if (isRendered == "false") {
    let gridHistory = ``;
    productHistory[index].thisMonthHistory.forEach((product) => {
      gridHistory += `
        <div>${product.name} ${product.price}</div>
      `;
    });
    console.log("render");
    thisGrid.innerHTML = gridHistory;
    thisGrid.dataset.rendered = "true";
  }
  thisGrid.classList.remove('hidden');
}

renderHistory();