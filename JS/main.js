const body = document.querySelector('body');
const box = document.querySelector('.list-container');
const time = document.querySelector('#time');
const greeting = document.querySelector('#greeting');
const listText = document.querySelector('#listText');
const listTime = document.querySelector('#listTime');
const btnAdd = document.querySelector('#add');
const btnShow = document.querySelector('#show');
const btnClose = document.querySelector('#close');
const result = document.querySelector('#return');
const name = document.querySelector('#name');
const showBox = document.querySelector('#showItems');
const overlay = document.querySelector('.body-overlay');
const inputBox = document.querySelector('.input-container');
const inputs = document.querySelectorAll('input');
const btnContainer = document.querySelector('.btn');
const showLi = document.querySelector('#showLi');


window.addEventListener('DOMContentLoaded', setTime)

//Setting Display Time
function setTime() {
    let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),
        sec = today.getSeconds();
    
        const amPm = hour >= 12 ? 'PM' : 'AM';

    hour = hour % 12 || 12;

    let output = '';
    output += `
        ${hour}:${addZero(min)}:${addZero(sec)} ${amPm}
    `;
    time.innerHTML = output;
    setTimeout(setTime, 1000)
}

//Creating a function which adds Zero to the minutes
const addZero = (n) => {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

//Setting Dislpay Greeting which changes with Time Format
const setGreeting = () => {
    let today = new Date(),
        hour = today.getHours();
    if (hour <12) {
        greeting.textContent = 'Good Morning ';
    } else if (hour < 17) {
        greeting.textContent = 'Good Afternoon ';
        body.style.backgroundImage = 'url(../Images/list2.jpg)';
        body.style.alignItems = 'flex-start';
        box.style.marginTop = '7rem';
    } else {
        greeting.textContent = 'Good Evening ';
    }
}

//Personalizing List in a Way you can Insert Your Name
const getName = () => {
    if (localStorage.getItem('name') === null ) {
        name.textContent = 'Name';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

//Saving Name in Local Storage
const setName = (e) => {
    if (e.type == 'keypress') {
        if (e.keyCode == 13) {
            localStorage.setItem('name', e.target.textContent);
            name.blur();
        }
    } else {
        localStorage.setItem('name', e.target.textContent);
    }
}

//Setting Dark Background input is focus which is active 
function overlayBg(e) {
    if (e.type === 'focus') {
        overlay.style.animation = 'fade 1s ease-in-out forwards';
        overlay.style.pointerEvents = 'initial'
    } 
}

//Events for Input and Name
listText.addEventListener('focus', overlayBg);
listTime.addEventListener('focus', overlayBg);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);


//Event on Dark Background which validates if both inputs are filled
overlay.addEventListener('click', () => {
    const list = listText.value;
    const lTime = listTime.value;

    if (list != '' && lTime != '') {
        overlay.style.animation = '';
        listText.value = '';
        listTime.value = '';
        overlay.style.pointerEvents = 'none'
    } else if (list === '' && lTime === '') {
        overlay.style.animation = '';
        overlay.style.pointerEvents = 'none'
    }
    else {
        overlay.style.animation = 'fade 1s ease-in-out forwards';
    }
});

//shaking input if they are empty
const transformInput =  (x, y)=>{
    listText.style.transform = `translate(${x}px, ${y}px)`;
    listTime.style.transform = `translate(${x}px, ${y}px)`;
}
function shakeInput() {
    let shakeTime = 100
    for (let i = 0; i < 6; i++){
                    setTimeout(transformInput, shakeTime * i, ((i % 2) * 2 - 1) * 8, 0);
                    setTimeout(transformInput, shakeTime * 6, 0, 0);
                }
}
const transform =  (x, y)=>{
    result.style.transform = `translate(${x}px, ${y}px)`;
}
function shake() {
    let shakeTime = 100
    for (let i = 0; i < 6; i++){
                    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 16, 0);
                    setTimeout(transform, shakeTime * 6, 0, 0);
                }
}


//function for displaying input being filled
const display = () => {
    const list = listText.value;
    const lTime = listTime.value;
    if (list != '' && lTime != '') {
        addListText(list, lTime);
    }
    listText.value = '';
    listTime.value = '';
    
    let today = new Date(),
        date = today.getDate(),
        month = today.getMonth(),
        year = today.getFullYear();

    if (list === '' && lTime === '') {
        inputs.forEach((input) => {
            input.style.border = '2px solid red';
            shakeInput();
            setTimeout(() => {
                input.style.border = '0'
            }, 2000)
        })
        const error = document.createElement('span');
        const errorText = document.createTextNode('Please add List');
        error.style.color = 'white';
        error.style.background = 'red';
        error.style.padding = '4px';
        error.style.borderRadius = '4px';
        error.style.alignSelf = 'start';
        error.style.margin = '-10px 0 20px 50px';
            
            error.appendChild(errorText);
            box.insertBefore(error, btnContainer);
        setTimeout(() => {
            error.style.display = 'none';
            }, 1500)
    }
    
    let output = '';
    output += `
            <div class="logo"><img src="./Images/listlogo1.jpg" width="70px"></div>
            <div class="date"><strong>Date:</strong> ${addZero(date)}/${addZero(month)}/${year}</div>
            <div class="text"><span class="a">${lTime}</span> <span class="b">${list}</span></div>
        `;
        result.innerHTML = output;
            if (list === '' && lTime === '') {
                result.style.display = 'none';
            } else if(list != '' && lTime != ''){
                result.style.display = 'flex';
                shake();
                setTimeout(() => {
                    result.style.display = 'none';
                }, 5000);
        }
        overlay.style.animation = '';
        overlay.style.pointerEvents = 'none'
    
}

//Function for Displaying all added List from Local Storage
const displayShow = () => {
    result.style.display = 'none';
    showBox.style.display = 'flex';
    
    for (let i = 0; i < JSON.parse(localStorage.getItem('myList')).length; i++){
        let output = '';
        output = `
            <li>${getListLs()[i]} <input type="checkbox" name="list" id="check"></li>
        `
        showLi.innerHTML += output;
    }
    
}

//Event for List Buttons
btnAdd.addEventListener('click', display);
btnShow.addEventListener('click', displayShow);
btnClose.addEventListener('click', () => {
    showBox.style.display = 'none';
    document.location.reload();
});

//Event for removing List Stored 
window.addEventListener('click', (e) => {
    if (e.target.id === 'check') {
        let length =JSON.parse(localStorage.getItem('myList')).length; 
        for (let i = 0; i < length; i = length) {
            removeItem(i);
            //remove the comment below to make the list on check disappear immediatly
            //e.target.parentElement.style.display = 'none';
        }
    }
});

//Function for adding each List to LocalStorage
function addListText(item, itemTime) {
let list;
    if (localStorage.getItem('myList') === null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem('myList'));
    }
    list.push(`${itemTime}  |${item}`);
    localStorage.setItem('myList', JSON.stringify(list));
}

//Function for removing Each List form LocalStorage
function removeItem(index) {
let list;
    if (localStorage.getItem('myList') === null) {
        list = [];
    } else {
        list = JSON.parse(localStorage.getItem('myList'));
    }
    list.splice(index, 1);
    localStorage.setItem('myList', JSON.stringify(list));
}

//Function use to get list from localStorage
const getListLs = ()=> {
    return JSON.parse(localStorage.getItem('myList', '[]'));
    
}


setGreeting();
getName();