let carOne = document.querySelector('#car-1');
let carTwo = document.querySelector('#car-2');
let start = document.querySelector('#start');
let acountSpan = document.querySelector('#acount');
let acountNumber = 0;
let betSpan = document.querySelector('#bet');
let betNumber = 0;
let betPlus = document.querySelector('#betPlus');
let betMinus = document.querySelector('#betMinus');
let choicOne = document.querySelector('#choicOne');
let choicTwo = document.querySelector('#choicTwo');
let acountBonus = document.querySelector('#acountBonus');
let choic = '';
let finish = false;
let historyList = document.querySelector('#historyList');

acountBonus.onclick = function(){
    acountNumber = acountNumber + 30;
    acountSpan.innerHTML = acountNumber;
    acountBonus.classList.remove('bonus_active');
    let historyElement = document.createElement('li');
    historyElement.innerHTML = 'Пополнение счёта. Текущий счёт = 30$';
    historyList.appendChild(historyElement);
};

betPlus.onclick = function(){
    if(acountNumber != 0){
        acountNumber = acountNumber - 10;
        betNumber = betNumber + 10;
        acountSpan.innerHTML = acountNumber;
        betSpan.innerHTML = betNumber;
    } else{
        alert('У тебя закончились деньги' + '\n' + 'Плати мне');
    }
};
betMinus.onclick = function(){
    if(betNumber != 0){
        betNumber = betNumber - 10;
        acountNumber = acountNumber + 10;
        betSpan.innerHTML = betNumber;
        acountSpan.innerHTML = acountNumber;
    } else{
        alert('Ставка уже нулевая.');
    }
};

choicOne.onclick = function(){
    choic = 'car1';
    choicOne.classList.add('choic_active');
    choicTwo.classList.remove('choic_active');
};
choicTwo.onclick = function(){
    choic = 'car2';
    choicTwo.classList.add('choic_active');
    choicOne.classList.remove('choic_active');
};

let speedCar = (car, carWinNumber, historyElement) => {
    let indent = 0;
    let goInterval = setInterval(() => {
        let speed = Math.random() * 0.15;
        console.log(speed)
        indent = indent + speed;
        car.style.left = indent + '%';
        if(indent > 85) {
            finish = true;
            if(carWinNumber == choic){
                acountNumber = acountNumber + betNumber * 2;
                betNumber = 0;
                acountSpan.innerHTML = acountNumber;
                betSpan.innerHTML = betNumber;
                let historyElementSpan = document.createElement('span');
                historyElementSpan.innerHTML = ' Победа! Текущий счёт = ' + acountNumber + '.';
                historyElementSpan.classList.add('span_green');
                historyElement.appendChild(historyElementSpan);
                betPlus.disabled = false;
                betMinus.disabled = false;
            } else{
                betNumber = 0;
                betSpan.innerHTML = 0;
                let historyElementSpan = document.createElement('span');
                historyElementSpan.innerHTML = ' Провал! Текущий счёт = ' + acountNumber + '.';
                historyElementSpan.classList.add('span_red');
                historyElement.appendChild(historyElementSpan);
                betPlus.disabled = false;
                betMinus.disabled = false;
                if(acountNumber == 0){
                    acountBonus.classList.add('bonus_active');
                }
            }
        }
        if(finish == true){
            start.disabled = false;
            choicOne.classList.remove('choic_active');
            choicTwo.classList.remove('choic_active');
            choicOne.disabled = false;
            choicTwo.disabled = false;
            clearInterval(goInterval);
        }
    }, 5)
}

start.onclick = function() {
    if(betNumber != 0 && choic != ''){
        let historyElement = document.createElement('li'); 
        historyElement.innerHTML = 'Ставка ' + betNumber + '$ ' + 'на ' + choic + '.';
        historyList.appendChild(historyElement);
        choicOne.disabled = true;
        choicTwo.disabled = true;
        speedCar(carOne, 'car1', historyElement);
        speedCar(carTwo, 'car2', historyElement);
        start.disabled = true;
        betPlus.disabled = true;
        betMinus.disabled = true;
        finish = false;
    } else{
        alert('Сделай ставку и выбери победителя!');
    }
};
