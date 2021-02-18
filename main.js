let input = document.querySelector('#userInput');
let getAdvice = document.querySelector('#getAdvice');
let randomAdvice = document.querySelector('#randomAdvice');
let paragraph = document.querySelector('p');
let mainHeader = document.querySelector('h1');

async function getAdviceOnInput() {
    const advice = await axios.get(`https://api.adviceslip.com/advice/search/${input.value}`)
    return advice;
}

async function getRandomAdvice() {
    const advice = await axios.get(`https://api.adviceslip.com/advice`)
    return advice;
}

getAdvice.addEventListener('click', () => {
    if (input.value != '') {
        clearInput();
        getAdviceOnInput().then(queryAdvice).catch(handleError)
    }
    else {
        mainHeader.innerHTML = `Please enter a <span> keyword </span>`
    }
})
randomAdvice.addEventListener('click', () => {
    clearInput();
    getRandomAdvice().then(displayRandomAdvice);
})

function clearInput() {
    input.style = 'display: none';
}

function queryAdvice(advice){
    let query = advice.data.query
    mainHeader.innerHTML = `Your <span> personal </span> advice on <span>${query}</span>:`;
    const randomSlip = Math.floor(Math.random() * advice.data.slips.length);
    paragraph.innerHTML = advice.data.slips[randomSlip].advice;
    getAdvice.innerHTML = 'Back';
    getAdvice.addEventListener('click', () => {
        location.reload();
    })
}

function displayRandomAdvice(advice) {
    mainHeader.innerHTML = `Your <span> random </span> advice:`;
    paragraph.innerHTML = advice.data.slip.advice;
    getAdvice.innerHTML = 'Back';
    getAdvice.addEventListener('click', () => {
        location.reload();
    })
}

function handleError(error) {
    mainHeader.innerHTML = 'Unfortunately there is an <span> error </span>:';
    getAdvice.innerHTML = 'Try again';
    getAdvice.addEventListener('click', () => {
        location.reload();
    })

    if (error.response) {
        paragraph.innerHTML = error.response;
    } else if (error.request) {
        paragraph.innerHTML = error.request;
    } else {
        paragraph.innerHTML = `We can not give advice on <span>${input.value}</span>, try something else!`;
    }
}



