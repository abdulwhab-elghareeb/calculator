let operator = {
    type: "",
    isClicked: false,
}
let equalSignIsClicked = false
let num1 = ""
let num2 = ""
let clickEvent = new Event("click")


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
function reminder(num , num2){
    return num % num2
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

    }else if (operator == "%"){
        operation = reminder
    }
    return limitDecimalNumbers(operation(num1 , num2))
}

displayScreenText = document.querySelector(".text")
topScreenText = document.querySelector(".top-text")

allButtons = Array.from(document.querySelectorAll("button"))

clearButton = document.querySelector(".clear-btn")
delButton = document.querySelector(".delete-btn")

numbers = document.querySelectorAll(".number-btn")
operators = document.querySelectorAll(".operator-btn")
equalSign = document.querySelector(".equal-btn")
decimalPoint = document.querySelector(".decimal-point-btn")

clearButton.addEventListener("click" , (event) => {
    clear()
})
delButton.addEventListener("click" , (event) =>{
    if(operator.isClicked){
        num2 = num2.slice(0, -1)
        updateDisplayScreen(num2)
    } else{
        num1 = num1.slice(0,-1)
        updateDisplayScreen(num1)
        updateTopDisplay(num1 + " " + operator.type)
    }
})
numbers.forEach((numberButton) =>{
    numberButton.addEventListener("click" , (event) =>{
        targetNumber = event.target.textContent

        if (equalSignIsClicked && !operator.isClicked){ // if the user clicked on a number after evaluating the result without clicking on operator then start a new operation
            clear()
        } 

        if(operator.isClicked){// if the user clicked any operator then start adding the numbers to num2 instead on num1
            num2 += targetNumber
            updateDisplayScreen(num2)

        }else{
            num1 += targetNumber
            updateDisplayScreen(num1)
            updateTopDisplay(num1 + " " + operator.type)
        }
        
    })
})

operators.forEach((operatorButton) => {

    operatorButton.addEventListener("click" , (event) =>{

        if (num1 && num2){ // if the user clicked an operator after entering the two numbers then evaluate the result
            equalSign.dispatchEvent(clickEvent)
            equalSignIsClicked = false // reverting it from true to false because we forced the event 
        }

        if (num1){ // do this only if the user already entered the first number
            operator.type = event.target.textContent;
            operator.isClicked = true 
            focusCurrentOperator(event)
            updateTopDisplay(num1 + " " + operator.type)
        }
    })
})
equalSign.addEventListener("click", (event) =>{

    if(num1 && num2 && operator.type){
        result = operate(Number(num1) , operator.type , Number(num2))
        topText = `${num1} ${operator.type} ${num2} =`
        clear()

        updateDisplayScreen(result)
        updateTopDisplay(topText)
        // making the result a string instead of a number because otherwise the delete button won't work
        num1 = String(result) // if the user wants to do further operations on the same result
        equalSignIsClicked = true
    }
})

decimalPoint.addEventListener("click", (event) =>{
    if (!displayScreenText.textContent.includes(".") && !num2){ // we are basically checking if the user did not enter any decimal points before and still entering the first number  
        num1 += "."
        updateDisplayScreen(num1)
        updateTopDisplay(num1 + " " + operator.type)

    }else if (!displayScreenText.textContent.includes(".")){ // the user is still entering the second number
        num2 += "."
        updateDisplayScreen(num2)
        
    }
})

//keyboard 
window.addEventListener("keydown" , (event) =>{
    let buttonList = ["c" , "Backspace" , "%" , "/",
                      "7" ,     "8"     , "9" , "*", 
                      "4" ,     "5"     , "6" , "-",                            
                      "1" ,     "2"     , "3" , "+",
                      "00",     "0"     , "." , "="]

    if (buttonList.includes(event.key)){
        allButtons[buttonList.indexOf(event.key)].dispatchEvent(clickEvent)
    }else if (event.key == "Enter"){
        allButtons[buttonList.indexOf("=")].dispatchEvent(clickEvent)
    }else if (event.key == "C"){
        allButtons[buttonList.indexOf("c")].dispatchEvent(clickEvent)
    }
})
//keyboard

// helper function
function limitDecimalNumbers(number,decimalLimit=3){
    let limit = 10 ** decimalLimit
    return Math.round(number * limit) / limit
}
function clear(){
    num1  = ""
    num2  = ""
    displayScreenText.textContent = ""
    topScreenText.textContent = ""
    equalSignIsClicked = false
    operator.isClicked = false
    operator.type = ""
    focusCurrentOperator()
}
function updateDisplayScreen(content){
    displayScreenText.textContent = content
}
function updateTopDisplay(content){
    topScreenText.textContent = content
}


function focusCurrentOperator(event=""){
    operators.forEach((operator) =>{
        operator.classList.remove("active-operator")
    })
    if (operator.isClicked){
        event.target.classList.add("active-operator")
    }

}

//helper functions