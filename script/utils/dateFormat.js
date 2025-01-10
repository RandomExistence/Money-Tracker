const monthArray = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export function formatDate(thisDay) {
  const day = thisDay.getDate();
  const month = thisDay.getMonth();
  const year = thisDay.getFullYear();

  return `${day} ${monthArray[month]} ${year}`
}

export function formatMonth(thisDay) {
  const month = thisDay.getMonth();
  const year = thisDay.getFullYear();

  return `${monthArray[month]} ${year}`
}