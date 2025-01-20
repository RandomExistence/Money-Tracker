import { productHistory } from "./arrayLogic.js";

function renderHistory() {
  console.log('renderHistory is called');
  console.log(document);
  let historyMainHTML = '';

  console.log(productHistory);
  
  productHistory.forEach((monthHistory, index) => {
    historyMainHTML += `
      <button class="expand-button js-expand-button js-expand-button-${index}" data-index="${index}">𝚒</button>
      <div class="record-date">${monthHistory.date}</div>
      <div class="record-value">${monthHistory.totalPrice} / ${monthHistory.maxPrice}</div>
      <div class="expand-month-history hidden js-expand-month-history-${index}" data-rendered="false"></div>
      <div class="newliner-div"></div>
    `;
  });
  document.querySelector('.js-main-history-body-div').innerHTML = historyMainHTML;
  
  document.querySelectorAll('.js-expand-button').forEach((button) => {
    button.addEventListener('click', () => {
      toggleHistoryExpand(Number(button.dataset.index));
      renderExpandButton(button.dataset.index);
    });
  });
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
    gridHistory += `
      <div class="history-expand-header-product">Product Name</div>
      <div class="history-expand-header-price">Price</div>
    `;
    if (productHistory[index].thisMonthHistory.length == 1) {
      gridHistory += `
        <div>No Product Recorded</div>
        <div></div>
      `;
    }

    productHistory[index].thisMonthHistory.forEach((product) => {
      if (product.name === "" && product.price === 0) {
        gridHistory += `
          <div class="horizontal-line-div"></div>
          <div></div>
        `;
      }
      else {
        gridHistory += `
          <div>${product.name}</div>
          <div>${product.price}</div>
        `;
      }
    });

    console.log("render");
    thisGrid.innerHTML = gridHistory;
    thisGrid.dataset.rendered = "true";
  }
  thisGrid.classList.remove('hidden');
}

function renderExpandButton(index) {
  const thisButton = document.querySelector(`.js-expand-button-${index}`);
  if (thisButton.innerHTML == '𝚒') {
    thisButton.innerHTML = '-';
  } else {
    thisButton.innerHTML = '𝚒';
  }
}

renderHistory();

document.querySelector('.js-return-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});