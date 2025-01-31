import { productToday ,  dailyEarn } from "../mainPage/moneyLogic.js";
import { formatMonth } from "../utils/dateFormat.js";

// would be nice if we could make it a class, you know to make it more concise
export let productHistory = JSON.parse(localStorage.getItem('productHistory')) || [];
if (productHistory.length === 0) {
  let today = new Date();
  productHistory.push({
    date: `${formatMonth(today)}`,
    totalPrice: 0,
    maxPrice: 0,
    thisMonthHistory: []
  })
}

// update maxPrice totalPrice and the productHistory array
// not new month, the first element is of our concern
export function transferProductTodayToProductHistory() {
  let yesterdayTotal = 0;
  productToday.forEach((product) => {
    productHistory[0].thisMonthHistory.push({
      name: product.name,
      price: product.price
    });
    yesterdayTotal += product.price;
  });

  // if you bought something yesterday, put in a line
  if (productToday.length != 0) {
    productHistory[0].thisMonthHistory.push({
      name: "",
      price: 0
    });
  }
  productHistory[0].totalPrice += yesterdayTotal;
  localStorage.setItem('productHistory', JSON.stringify(productHistory));
}

export function addProductHistoryMaxPrice() {
  productHistory[0].maxPrice += dailyEarn;
  localStorage.setItem('productHistory', JSON.stringify(productHistory));
}

// new month
export function appendProductHistory() {
  let today = new Date();
  productHistory.unshift({
    date: `${formatMonth(today)}`,
    totalPrice: 0,
    maxPrice: 0,
    thisMonthHistory: []
  });

  if (productHistory.length > 12) {
    productHistory.splice(12);
  }
}


