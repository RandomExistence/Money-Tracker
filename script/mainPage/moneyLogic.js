export let dailyEarn = 250;
export let productToday = JSON.parse(localStorage.getItem('productToday')) || [];
export let yesterdayMonthTotal = JSON.parse(localStorage.getItem('yesterdayMonthTotal')) || 0;
export let monthMaxTotal = JSON.parse(localStorage.getItem('monthMaxTotal')) || 0;

// ----------------------- productToday modifier --------------------------- //

export function updateProductArray(index, changedProduct, changedPrice) {
  productToday[index].name = changedProduct;
  productToday[index].price = changedPrice;
  localStorage.setItem('productToday', JSON.stringify(productToday));
}

export function removeProductFromArray(index) {
  productToday.splice(index, 1);
  localStorage.setItem('productToday', JSON.stringify(productToday));
}

export function addProductToArray(product, price) {
 productToday.push(
  {
    name: product,
    price: price
  }
 );
 localStorage.setItem('productToday', JSON.stringify(productToday));
}

export function removeProductTodayArray() {
  localStorage.removeItem('productToday');
  productToday = [];
}

// ---------------------------------- modiiy other variables ----------------------------- //

export function updateMonthMaxTotal() {
  monthMaxTotal += dailyEarn;
  localStorage.setItem('monthMaxTotal', JSON.stringify(monthMaxTotal));
}

export function updateYesterdayMonthTotal() {
  let yesterdayTotal = 0;
  productToday.forEach((product) => {
    yesterdayTotal += product.price;
  });
  const currentMonthTotal = yesterdayMonthTotal + yesterdayTotal;
  yesterdayMonthTotal = currentMonthTotal; // since today is 0, they are the same
  localStorage.setItem('yesterdayMonthTotal', JSON.stringify(currentMonthTotal));
}
