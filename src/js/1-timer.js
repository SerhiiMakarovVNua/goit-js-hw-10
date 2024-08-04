import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputEl = document.querySelector("#datetime-picker");
const buttonEl = document.querySelector('[data-start]');
const daysEl = document.querySelector("[data-days]");
const hoursEl = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");   

let userSelectedDate;
let countdownTimer;

buttonEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    if (userSelectedDate < new Date()) {
        // window.alert("Please choose a date in the future");
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
      position: 'topRight',
      titleColor: '#fff',
      messageColor: '#fff',
      color: '#ef4040',
        iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.81 0.219C6.95056 0.0787966 7.14097 4.21785e-05 7.3395 0L16.6605 0C16.859 4.21785e-05 17.0494 0.0787966 17.19 0.219L23.781 6.81C23.9212 6.95056 24 7.14097 24 7.3395V16.6605C24 16.859 23.9212 17.0494 23.781 17.19L17.19 23.781C17.0494 23.9212 16.859 24 16.6605 24H7.3395C7.14097 24 6.95056 23.9212 6.81 23.781L0.219 17.19C0.0787966 17.0494 4.21785e-05 16.859 0 16.6605L0 7.3395C4.21785e-05 7.14097 0.0787966 6.95056 0.219 6.81L6.81 0.219ZM7.65 1.5L1.5 7.65V16.35L7.65 22.5H16.35L22.5 16.35V7.65L16.35 1.5H7.65Z" fill="#FAFAFB"/>
      <path d="M6.969 6.969C7.03867 6.89915 7.12143 6.84374 7.21255 6.80593C7.30366 6.76812 7.40135 6.74866 7.5 6.74866C7.59865 6.74866 7.69633 6.76812 7.78745 6.80593C7.87857 6.84374 7.96133 6.89915 8.031 6.969L12 10.9395L15.969 6.969C16.0387 6.89927 16.1215 6.84395 16.2126 6.80621C16.3037 6.76847 16.4014 6.74905 16.5 6.74905C16.5986 6.74905 16.6963 6.76847 16.7874 6.80621C16.8785 6.84395 16.9613 6.89927 17.031 6.969C17.1007 7.03873 17.156 7.12151 17.1938 7.21262C17.2315 7.30373 17.2509 7.40138 17.2509 7.5C17.2509 7.59861 17.2315 7.69626 17.1938 7.78737C17.156 7.87848 17.1007 7.96127 17.031 8.031L13.0605 12L17.031 15.969C17.1007 16.0387 17.156 16.1215 17.1938 16.2126C17.2315 16.3037 17.2509 16.4014 17.2509 16.5C17.2509 16.5986 17.2315 16.6963 17.1938 16.7874C17.156 16.8785 17.1007 16.9613 17.031 17.031C16.9613 17.1007 16.8785 17.156 16.7874 17.1938C16.6963 17.2315 16.5986 17.2509 16.5 17.2509C16.4014 17.2509 16.3037 17.2315 16.2126 17.1938C16.1215 17.156 16.0387 17.1007 15.969 17.031L12 13.0605L8.031 17.031C7.96127 17.1007 7.87848 17.156 7.78737 17.1938C7.69626 17.2315 7.59861 17.2509 7.5 17.2509C7.40138 17.2509 7.30373 17.2315 7.21262 17.1938C7.12151 17.156 7.03873 17.1007 6.969 17.031C6.89927 16.9613 6.84395 16.8785 6.80621 16.7874C6.76847 16.6963 6.74905 16.5986 6.74905 16.5C6.74905 16.4014 6.76847 16.3037 6.80621 16.2126C6.84395 16.1215 6.89927 16.0387 6.969 15.969L10.9395 12L6.969 8.031C6.89915 7.96133 6.84374 7.87857 6.80593 7.78745C6.76812 7.69633 6.74866 7.59865 6.74866 7.5C6.74866 7.40135 6.76812 7.30366 6.80593 7.21255C6.84374 7.12143 6.89915 7.03867 6.969 6.969Z" fill="#FAFAFB"/>
    </svg>`)
    });
    buttonEl.disabled = true;
    } else {
    buttonEl.disabled = false;
    }
  }
};

flatpickr("#datetime-picker", options);

buttonEl.addEventListener("click", function () {
  this.disabled = true;
  inputEl.disabled = true;
  countdownTimer = setInterval(function () {
    let now = new Date().getTime();
    let distance = userSelectedDate - now;
    if (distance < 0) {
      clearInterval(countdownTimer);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      buttonEl.disabled = true;
      inputEl.disabled = false;
      return;
    }
    let { days, hours, minutes, seconds } = convertMs(distance);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const styleElement = document.createElement('style');
styleElement.type = 'text/css';
const styles = `
body {
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.04em;
  color: #2e2f42;
}
#datetime-picker {
  border-radius: 4px;
  width: 280px;
  height: 40px;
  padding-left: 16px;
  margin-bottom: 32px;
  outline: none;
  transition: border-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
#datetime-picker:focus {
  border-color: #6c8cff;
}
[data-start] {
  border-radius: 8px;
  padding: 8px 16px;
  width: 75px;
  height: 40px;
  background: #4e75ff;
  border: none;
  font-weight: 500;
  color: #fff;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
[data-start]:hover {
    background: #6c8cff;
}
[data-start]:disabled {
    background: #cfcfcf;
    color: #989898;
}
.timer {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: row;
  gap: 24px;
  width: 346px;
}
.field {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 0px;
}
.value {
  font-size: 40px;
  line-height: 1.2;
}
.label {
  text-transform: uppercase;
}`;
styleElement.appendChild(document.createTextNode(styles));
document.head.appendChild(styleElement);