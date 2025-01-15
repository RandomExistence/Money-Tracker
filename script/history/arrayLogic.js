import { productToday ,  dailyEarn } from "../spending.js";

// would be nice if we could make it a class, you know to make it more concise
export let productHistory = JSON.parse(localStorage.getItem('productHistory')) || [
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
      {
        name: 'fish',
        price: 20
      },
      {
        name: 'pencil case of great glitter',
        price: 20
      }
    ]
  },
];

// not new month, the first element is of our concern
export function updateProductHistory() {
  console.log('hello again');
  let yesterdayTotal = 0;
  productToday.forEach((product) => {
    productHistory[0].thisMonthHistory.push({
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


