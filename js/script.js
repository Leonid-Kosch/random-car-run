let carOne = document.querySelector('#car-1');
let carTwo = document.querySelector('#car-2');
let start = document.querySelector('#start');
let acountSpan = document.querySelector('#acount');
let acountNumber = 100;
let betSpan = document.querySelector('#bet');
let betNumber = 0;
let betPlus = document.querySelector('#betPlus');
let betMinus = document.querySelector('#betMinus');
let choicOne = document.querySelector('#choicOne');
let choicTwo = document.querySelector('#choicTwo');
let acountBonus = document.querySelector('#acountBonus');
let choic;
let finish = false;

acountBonus.onclick = function(){
    acountNumber = acountNumber + 30;
    acountSpan.innerHTML = acountNumber;
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
    choic = 'carOne';
};
choicTwo.onclick = function(){
    choic = 'carTwo';
};

let speedCar = (car, carWinNumber) => {
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
            } else{
                betNumber = 0;
                betSpan.innerHTML = 0;
            }
        }
        if(finish == true){
            clearInterval(goInterval);
            start.disabled = false;
        }
    }, 5)
}

start.onclick = function() {
    finish = false;
    if(betNumber != 0){
        speedCar(carOne, 'carOne');
        speedCar(carTwo, 'carTwo');
        start.disabled = true;
    } else{
        alert('Сделай ставку!');
    }
};