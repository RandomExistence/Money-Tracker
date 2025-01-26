export function setUpButton() {

  document.querySelector('.js-view-history-button').addEventListener('click', () => {
    window.location.href = 'history.html';
  });
  document.querySelector('.js-login-view-history-button').addEventListener('click', () => {
    window.location.href = 'history.html';
  });

  document.querySelector('.js-reset-button').addEventListener('click', () => {
    document.querySelectorAll('.js-reset-element').forEach((element) => {
      if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
      }
      else {
        element.classList.add('hidden');
      }
    });
  });

  document.querySelector('.js-confirm-yes-button').addEventListener('click', ()=> {
    alert('your information has been reset. Page will reload');
    resetInformation();
  });

  document.querySelector('.js-confirm-no-button').addEventListener('click', ()=> {
    document.querySelectorAll('.js-reset-element').forEach((element) => {
        element.classList.add('hidden');
    });
  });
}

export function resetInformation() {
  localStorage.clear();
  window.location.href = 'index.html';
}