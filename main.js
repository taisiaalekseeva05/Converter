// объект с курсами 3х валют
const rates = {};
// элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value ="USD"]');
const elementEUR = document.querySelector('[data-value ="EUR"]');
const elementGBP = document.querySelector('[data-value ="GBP"]');

// находим элементы формыб
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const select = document.querySelector('#select');


// запускаем
getСurrencies();
// функция получения курса валют и отобрпжения их на странице
async function getСurrencies () {
    const response = await fetch ('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;

    // console.log(result);
    // console.log(result.Valute.USD.Value);
    console.log(rates);

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    }else {
        elementUSD.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    }else {
        elementEUR.classList.add('bottom');
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    }else {
        elementGBP.classList.add('bottom');
    }
    
}
// слушаем ввод в элемент input
// метод oninput определяет функцию для изменения значения инпута
// слушаем изменения в текстовом поле и в select
input.oninput = convertValue;
select.oninput = convertValue;

function convertValue(){
    result.value = (parseFloat(input.value) / rates[select.value].value).toFixed(2); 
}    

 



