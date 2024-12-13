    const weatherForm = document.querySelector('form')
    const search = document.querySelector('input')
    const unitSelect = document.getElementById('unitSelect');
    const messageOne = document.querySelector('#message-1')
    const messageTwo = document.querySelector('#message-2')

    weatherForm.addEventListener('submit', (e) => {
        e.preventDefault()

        const location = search.value
        const unit = unitSelect.value;
        console.log(unit, '<<< unit')
        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch(`/weather?address=${encodeURIComponent(location)}&unit=${unit}`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error
                } else {
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                }
            })
        })
    })