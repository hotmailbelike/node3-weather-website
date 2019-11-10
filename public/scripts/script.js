console.log('file loaded');

// fetch('http://puzzle.mead.io/puzzle').then(res => {
//   res.json().then(data => {
//     console.log(data);
//   });
// });

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

msg1.textContent = '';
msg2.textContent = '';

weatherForm.addEventListener('submit', e => {
  msg1.textContent = 'Fetching weather data...';
  msg2.textContent = '';
  const locationName = search.value;
  e.preventDefault();
  // console.log(location);

  fetch('/weather?address=' + locationName).then(res => {
    res.json().then(data => {
      if (data.error) {
        // console.log(data.error);
        msg1.textContent = data.error;
      } else {
        // console.log(data.location);
        // console.log(data.forecast);
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
      }
    });
  });

  weatherForm.reset();
  //
});
