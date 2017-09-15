/* register service worker */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {

        console.log('ServiceWorker registration successful with scope: ', registration.scope);

      })
      .catch(error => {

        console.error('ServiceWorker registration failed: ', error);
        
      });
  });
}


/* variables */

const elements = {
  hour: document.querySelector('.clock__hour'),
  minute: document.querySelector('.clock__minute'),
  second: document.querySelector('.clock__second'),
  period: document.querySelector('.clock__period'),
};


/* main */

startClock();


/* functions */

function startClock() {
  updateTimeElements();

  const clockInterval = setInterval(() => {
    updateTimeElements();
  }, 1000);
}

function updateTimeElements() {
  const time = getTimeObj();

  elements.hour.innerHTML = time.hr;
  elements.minute.innerHTML = time.min;
  elements.second.innerHTML = time.sec;
  elements.period.innerHTML = time.period;
}

function getTimeObj() {
  const d = new Date();
  let hr = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
  let period = 'am';

  /* set pm at noon and after */
  if (hr >= 12) { period = 'pm'; }

  /* convert 24 hour time */
  if (hr > 12)  { hr -= 12; }

  /* convert midnight hour (0) to 12 */
  if (hr === 0) { hr = 12; }

  /* pad single digit minutes with leading 0 */
  if (min < 10) { min = '0' + min; }

  /* pad single digit seconds with leading 0 */
  if (sec < 10) { sec = '0' + sec; }

  return { hr, min, sec, period };
}