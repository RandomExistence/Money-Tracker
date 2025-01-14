import { productHistory } from "./arrayLogic.js";

function renderHistory() {
  console.log('renderHistory is called');
  console.log(document);
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

document.querySelector('.js-return-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});