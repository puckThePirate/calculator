const pressed = document.querySelectorAll('button');
const display = document.querySelector('.screen');
const msg = document.createElement('div');
msg.classList.add('message');

let lastPress = 0, // if last button is operator then 1 otherwise 0
    deci = 0,
    cache = 0,
    cacheForDisplay = 0,
    firstOperand = 0,
    firstAssign = 0,
    secondOperand = 0,
    secondAssign = 0,
    operator = "",
    equal = 0, // if equals button was clicked then 1 otherwise 0
    result = 0;

function inital() {

    lastPress = 0;
    deci = 0;
    cache = 0;
    cacheForDisplay = 0;
    firstOperand = 0;
    firstAssign = 0;
    secondOperand = 0;
    secondAssign = 0;
    operator = "";
    equal = 0;
    result = 0;

    msg.remove(); // initial msg
    msg.textContent = `${result}`;
    display.appendChild(msg);
}

inital();

function butonpress(e) {
    if (e.target.getAttribute('class') == "key") {

        if (e.target.getAttribute('id') !== 'decimal') { // number

            if (cacheForDisplay == 1) {
                cacheForDisplay = 0;

                if (equal == 0 && firstAssign == 0) {
                    firstOperand = cache;
                    firstAssign = 1;
                }

                cache = 0;

            }

            lastPress = 0;
            cache = cache * 10 + parseFloat(e.target.value);

            show();

        } else if(e.target.getAttribute('id') == 'decimal' && deci == 0) {

            deci = 1;

        }
    } else if (e.target.getAttribute('class') == "operator") { // operator

        if (firstAssign == 0 && lastPress !== 1) {

            firstOperand = cache;
            firstAssign = 1;
            cache = 0;

        } else if (firstAssign == 1 && lastPress !== 1) {

            secondOperand = cache;
            secondAssign = 1;
            cache = 0;
        }

        if (secondAssign == 1) {
            operate();

            firstOperand = 0;
            secondOperand = 0;
            firstAssign = 0;
            secondAssign = 0;

            cache = result;
            cacheForDisplay = 1;
        }

        operator = e.target.value;
        lastPress = 1;
        equal = 0;
        deci = 0;

        show();

    } else if (e.target.getAttribute('class') == "equals") {

        equal = 1;
        deci = 0;

        operate();

        cache = result;
        cacheForDisplay = 1;

        firstOperand = 0;
        firstAssign = 0;
        secondOperand = 0;
        secondAssign = 0;

        operator = '';

        show();

    } else if (e.target.getAttribute('class') == "clear") { // clear

        inital();

    } else if (e.target.getAttribute('class') == "delete") { // delete

        if (firstAssign == 0 && lastPress == 1) {

            operator = '';
            lastPress = 0;
            firstAssign = 0;
            equal = 1;
            cacheForDisplay = 0;

        } else if (firstAssign == 1 && lastPress == 0) {

            if (Math.floor(cache / 10) !== 0) {

                cache = Math.floor(cache / 10);

            } else {

                cache = 0;
                lastPress = 1;

            }
        } else if (firstAssign == 1 && lastPress == 1) {

            operator = '';
            equal = 1;
            lastPress = 0;
            firstAssign = 0;
            cache = firstOperand;
            cacheForDisplay = 0;

        } else {

            cache = Math.floor(cache / 10);
            cacheForDisplay = 0;

        }

        show();

    }
}

function operate() {

    if (firstAssign == 1 && secondAssign == 1) {

        if (operator == '+') { // add

            result = firstOperand + secondOperand;

        } else if (operator == '-') { //sub

            result = firstOperand - secondOperand;

        } else if (operator == '*') { //mul

            result = firstOperand * secondOperand;

        } else if (operator == '/' && secondOperand !== 0) { // divide

            result = parseFloat((firstOperand / secondOperand).toFixed(1));

        } else if (operator == '/' && secondOperand == 0) { // divide by 0

            result = 'error';
        }

    } else {

        if (firstAssign == 0) {

            result = cache;
            cache = 0;

        } else if (firstAssign == 1 && lastPress == 1) {

            result = firstOperand;

        } else {

            if (operator == '+') { // add

                result = firstOperand + cache;

            } else if (operator == '-') { //sub

                result = firstOperand - cache;

            } else if (operator == '*') { //mul

                result = firstOperand * cache;

            } else if (operator == '/' && cache !== 0) { // divide

                result = parseFloat((firstOperand / cache).toFixed(1));

            } else if (operator == '/' && cache == 0) { // divide by 0

                result = 'error';

            }
        }
    }
}

function show() { // display

    if (firstAssign == 0 && lastPress == 1) {

        msg.remove();
        msg.textContent = `${cache} ${operator}`;
        display.appendChild(msg);

    } else if (firstAssign == 1 && lastPress == 0) {

        msg.remove();
        msg.textContent = `${firstOperand} ${operator} ${cache}`;
        display.appendChild(msg);

    } else if (firstAssign == 1 && lastPress == 1) {

        msg.remove();
        msg.textContent = `${firstOperand} ${operator}`;
        display.appendChild(msg);

    } else {

        msg.remove();
        msg.textContent = `${cache}`;
        display.appendChild(msg);
        
    }
}

pressed.forEach(key => {

    key.addEventListener('click', butonpress);
    
});