const weatherForm = document.querySelector('form')
const search = document.querySelector('input');

const searchLocation = document.querySelector('.search-location');
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

search.addEventListener('input',(e)=>{
    searchLocation.innerText = search.value
})
weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  let address = search.value;
  messageOne.textContent = 'loading...';
  messageTwo.textContent = ''
  fetch(`/weather?address=${address}`).then((response)=>{
      response.json().then((data)=>{
          if(data.error) {
              messageOne.textContent  = data.error;
          }
          else{
              messageOne.textContent = data.location;
              messageTwo.textContent = data.forecast;
          }

      });
  });
})