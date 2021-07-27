const form = document.querySelector('.weatherform');
const search = document.querySelector('.weatherform #address');
const messageContainer = document.querySelector('#message p');
const headerContainer = document.querySelector('#message h4')
const loader = document.getElementById('loader');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  loader.classList.add('loading');
  messageContainer.textContent = 'Loading...';
  headerContainer.textContent = '';
  messageContainer.classList.remove('error');
  const location = search.value;
  const url = 'http://localhost:3000/weather?address=' + location;
  fetch(url).then((res) => {
    res.json().then((data) => {
      if(data.error) {
        loader.classList.remove('loading');
        messageContainer.classList.add('error');
        messageContainer.textContent = data.error;
      } else {
        loader.classList.remove('loading');
        headerContainer.textContent = data.location;
        messageContainer.textContent = data.message;

      }
    })
  })



})
