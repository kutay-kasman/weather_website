const cityName = document.getElementById('city-name')
const weatherForm = document.querySelector('form')
const data1 = document.getElementById('data-1')
const data2 = document.getElementById('data-2')


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    data1.innerText = 'Loading...'
    data2.innerText = ''

    fetch('/weather?address=' + cityName.value).then(response => {
        response.json().then(data => {
            if(data.error) {
                data1.innerText = data.error
            }
            else {
                data1.innerText = data.location + '\n\n'
                data2.innerText = data.forecast
            }
        })
    })
})