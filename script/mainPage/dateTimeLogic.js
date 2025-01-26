export let today = new Date();
export let recDay = new Date();
export let lastLoginDay = new Date();

// set up recDay
if (!localStorage.getItem('recDay')) {
  recDay.setDate(today.getDate() - 1);
} else {
  recDay = new Date(localStorage.getItem('recDay'));
}
// set up lastLoginDay
if (!localStorage.getItem('lastLoginDay')) {
  lastLoginDay.setDate(today.getDate() - 1);
} else {
  lastLoginDay = new Date(localStorage.getItem('lastLoginDay'));
}

export function updateRecDay() {
  recDay = new Date();
  localStorage.setItem('recDay', today.toISOString());
}

export function updateLastLoginDay() {
  lastLoginDay = new Date();
  localStorage.setItem('lastLoginDay', today.toISOString());
}