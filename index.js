const input = document.getElementById('input')
const number = document.querySelectorAll('.numbers div')
const operator = document.querySelectorAll('.operators div')
const result = document.getElementById('result')
const clear = document.getElementById('clear')
const resultDisplayed = false

for (const i = 0; i < number.length; i++) {
    number[i].addEventListener("click", function (e) {
        const currentString = input.innerHTML;
        const lastChar = currentString[currentString.length - 1];
        if (resultDisplayed === false) {
            input.innerHTML += e.target.innerHTML;
        } else if (resultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            resultDisplayed = false;
            input.innerHTML += e.target.innerHTML;
        } else {
            resultDisplayed = false;
            input.innerHTML = "";
            input.innerHTML += e.target.innerHTML;
        }
    });
}

for (const i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function (e) {

        const currentString = input.innerHTML;
        const lastChar = currentString[currentString.length - 1];

        if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
            const newString = currentString.substring(0, currentString.length - 1) + e.target.innerHTML;
            input.innerHTML = newString;
        } else if (currentString.length == 0) {
            return
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}

result.addEventListener("click", function () {

    const inputString = input.innerHTML;

    const numbers = inputString.split(/\+|\-|\×|\÷/g);

    const operators = inputString.replace(/[0-9]|\./g, "").split("");
    const delit = operators.indexOf("÷");
    while (delit != -1) {
        numbers.splice(delit, 2, numbers[delit] / numbers[delit + 1]);
        operators.splice(delit, 1);
        delit = operators.indexOf("÷");
    }

    const multiply = operators.indexOf("×");
    while (multiply != -1) {
        numbers.splice(multiply, 2, numbers[multiply] * numbers[multiply + 1]);
        operators.splice(multiply, 1);
        multiply = operators.indexOf("×");
    }

    const minus = operators.indexOf("-");
    while (minus != -1) {
        numbers.splice(minus, 2, numbers[minus] - numbers[minus + 1]);
        operators.splice(minus, 1);
        minus = operators.indexOf("-");
    }

    const plus = operators.indexOf("+");
    while (plus != -1) {
        numbers.splice(plus, 2, parseFloat(numbers[plus]) + parseFloat(numbers[plus + 1]));
        operators.splice(plus, 1);
        plus = operators.indexOf("+");
    }

    input.innerHTML = numbers[0];

    resultDisplayed = true;
});

clear.addEventListener("click", function () {
    input.innerHTML = "";
})