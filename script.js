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