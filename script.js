let operator = {
    type: "",
    isClicked: false,
}

let num1 = ""
let num2 = "";


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
    return num1 / num2;
}

function operate(num1 , operator , num2){
    let operation = add
    
    if (operator == "-"){
        operation = subtract

    }else if (operator == "/"){
        if (num1 == 0|| num2 == 0){
            return "Error"
        }
        operation = divide

    }else if (operator == "*" || operator == "x"){
        operation = multiply
    }

    return limitDecimalNumbers(operation(num1 , num2))
}
displayScreenText = document.querySelector(".text")
clearButton = document.querySelector(".clear-btn")
numbers = document.querySelectorAll(".number-btn")
operators = document.querySelectorAll(".operator-btn")
equalSign = document.querySelector(".equal-btn")

clearButton.addEventListener("click" , (event) => {
    clear()
})

numbers.forEach((numberButton) =>{
    numberButton.addEventListener("click" , (event) =>{
        targetContent = event.target.textContent
        if(!(operator.isClicked)){
            num1 += targetContent
            console.log(num1)
            displayScreenText.textContent = num1
        }else{
            num2 += targetContent
            displayScreenText.textContent = num2    
        }
        
    })
})

operators.forEach((operatorButton) => {
    operatorButton.addEventListener("click" , (event) =>{
            operator.type = event.target.textContent;
            operator.isClicked = true
        if (num2){
            let clickEvent = new Event("click")
            equalSign.dispatchEvent(clickEvent)
            prevResult = displayScreenText.textContent
            num1 = prevResult
            
        }
    })
    })
equalSign.addEventListener("click", (event) =>{
    if(num1 && num2 && operator.type){
        result = operate(Number(num1) , operator.type , Number(num2))
        clear()

        displayScreenText.textContent = result
    }
})






// helper function
function limitDecimalNumbers(number,decimalLimit=3){
    let limit = 10 ** decimalLimit
    return Math.floor(number * limit) / limit
}
function clear(){
    num1  = ""
    num2  = ""
    displayScreenText.textContent = ""
    operator.isClicked = false
    operator.type = ""
}