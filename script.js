let operator;
let num1;
let num2;


function add(num1 , num2){
    return num1 + num2;
}
function subtract(num1 , num2){
    return num1 - num2;
}
function multiply(num1 , num2){
    return num1 * num2;
}
function divide(num1 , num2){
    if (num1 === 0 || num2 === 0){
        return "ERROR"
    }
    return num1 / num2;
}

function operate(num1 , operator , num2){
    let operation = add
    
    if (operator == "-"){
        operation = subtract

    }else if (operator == "/"){
        operation = divide

    }else if (operator == "*"){
        operation = multiply
    }

    return limitDecimalNumbers(operation(num1 , num2))
}
// helper function
function limitDecimalNumbers(number,decimalLimit=3){
    let limit = 10 ** decimalLimit
    return Math.floor(number * limit) / limit
}