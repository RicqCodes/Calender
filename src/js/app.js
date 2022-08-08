const calendarMonth = document.querySelector('.calendar-month');
const calendarDay = document.querySelector('.calendar-days');
const prevButton = document.querySelector('.calendar-prev');
const nextButton = document.querySelector('.calendar-next');
const prevDate = document.querySelector('.prev-date');
let daysArr = [];
let prevMonthDays = [];

let dateData = {
  startDay: null,
  numOfDays: null,
  monthPeriod: null,
  yearPeriod: null,
  prevNumDays: null,
};
//prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//prettier-ignore
const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const calcNumDays = function (year, month, day) {
  // gets date where month starts
  const dayS = new Date(year, month, 1);

  const startDay = dayS.getDay();

  const monthPeriod = dayS.getMonth();

  const yearPeriod = dayS.getFullYear();

  return { startDay, monthPeriod, yearPeriod };
};

const calcPrevNumDays = function (year, month, day = 0) {
  const getNumDays = new Date(year, month, day);
  const numOfDays = getNumDays.getDate();
  dateData.numOfDays = numOfDays;
  console.log(numOfDays);
  return numOfDays;
};

// Calculates how many days in a month
const callFunction = function () {
  const newDate = new Date();
  const curYear = newDate.getFullYear();
  const curMonth = newDate.getMonth();
  dateData = calcNumDays(curYear, curMonth);
  dateData.prevNumDays = calcPrevNumDays(curYear, curMonth - 1);
};

callFunction();

// Pushes dates to an array
const curNumDate = function (days) {
  for (let i = days; i >= 1; i--) {
    daysArr.push(i);
  }
};

const prevNumDate = function (days) {
  for (let i = days; i >= 1; i--) {
    prevMonthDays.push(i);
  }
};

curNumDate(dateData.numOfDays);
prevNumDate(dateData.prevNumDays);

// Sorts date array in a numeric order
daysArr.sort((a, b) => a - b);
prevMonthDays.sort((a, b) => a - b);

const render = function (currArr = daysArr, prevArr = prevMonthDays) {
  // Render month

  let dates = '';

  const dayNum = dateData.startDay;
  if (day[dayNum] === 'Sunday') {
    return '';
  }
  if (day[dayNum] === 'Monday') {
    prevArr.splice(-1).forEach(days => {
      dates += `<div class="prev-date">${days}</div>`;
    });
  }
  if (day[dayNum] === 'Tuesday') {
    prevArr.splice(-2).forEach(days => {
      dates += `<div class="prev-date">${days}</div>`;
    });
  }
  if (day[dayNum] === 'Wednesday') {
    prevArr.splice(-3).forEach(days => {
      dates += `<div class="prev-date">${days}</div>`;
    });
  }
  if (day[dayNum] === 'Thursday') {
    prevArr.splice(-4).forEach(days => {
      dates += `<div class="prev-date">${days}</div>`;
    });
  }
  if (day[dayNum] === 'Friday') {
    prevArr.splice(-5).forEach(days => {
      dates += `<div class="prev-date">${days}</div>`;
    });
  }
  if (day[dayNum] === 'Saturday') {
    prevArr.splice(-6).forEach(days => {
      dates += `<div class="prev-date">${days}</div>`;
    });
  }
  console.log(currArr);
  currArr.forEach(day => {
    dates += `<div class =${
      new Date().getDate() == day &&
      new Date().getMonth() == dateData.monthPeriod
        ? 'today'
        : ''
    }>${day}</div>`;
  });

  console.log(dates);

  document.querySelector('.calendar-month h4').textContent =
    months[dateData.monthPeriod];
  document.querySelector('.calendar-month p').textContent = dateData.yearPeriod;
  calendarDay.innerHTML = dates;
};

//Event Handlers

prevButton.addEventListener('click', function () {
  daysArr = [];
  prevMonthDays = [];
  const prevMonth = dateData.monthPeriod - 1;
  dateData = calcNumDays(dateData.yearPeriod, prevMonth);
  dateData.prevNumDays = calcPrevNumDays(dateData.yearPeriod, prevMonth - 1);
  console.log(dateData);

  curNumDate(dateData.numOfDays);
  prevNumDate(dateData.prevNumDays);

  daysArr.sort((a, b) => a - b);
  prevMonthDays.sort((a, b) => a - b);

  render();
});

nextButton.addEventListener('click', function () {
  daysArr = [];
  prevMonthDays = [];

  const prevMonth = dateData.monthPeriod + 1;
  dateData = calcNumDays(dateData.yearPeriod, prevMonth);
  dateData.prevNumDays = calcPrevNumDays(dateData.yearPeriod, prevMonth - 1);
  console.log(dateData);

  curNumDate(dateData.numOfDays);
  prevNumDate(dateData.prevNumDays);

  daysArr.sort((a, b) => a - b);
  prevMonthDays.sort((a, b) => a - b);

  render();
});

render();
