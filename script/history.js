export let productHistory = [
  {
    date: 'Dec 2024',
    totalPrice: 30,
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
    totalPrice: 30,
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
];

document.querySelector('.js-return-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});

function renderHistory() {
  let historyMainHTML = '';

  for (let i = 0; i < 12; ++i) {
    historyMainHTML += `
      <button class="expand-button js-expand-button" data-index="${i}">expand</button>
      <div class="record-date">Dec 2024</div>
      <div class="record-value">2345/3500</div>
      <br>
    `;
  }
  document.querySelector('.js-main-history-body-div').innerHTML = historyMainHTML;

  document.querySelectorAll('.js-expand-button').forEach((button) => {
    button.addEventListener('click', () => {
      console.log('expanded');
      console.log(button.dataset.index);
    });

  });
}

renderHistory();