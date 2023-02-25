// Animation on the buttons
$("li").click(function(event) {
    
    animation(event);
    
});

function animation(event) {
    let active = event.target.id;
    
    console.log(event.target.id);
    if(active == "equal"){

        $("#" + active).addClass("equalBtnAnimation");
        setTimeout(function() {
            $("#" + active).removeClass("equalBtnAnimation");
        }, 200);
        
    }else if(active == "reset" || active == "del"){
        $("#" + active).addClass("resetAndDelBtnAnimation");
        setTimeout(function() {
            $("#" + active).removeClass("resetAndDelBtnAnimation");
        }, 200);
    } else {
        $("#" + active).addClass("btnAnimation");
        setTimeout(function() {
            $("#" + active).removeClass("btnAnimation");
        }, 200);
    }

}

// Functional part of the calculators
class Calculator {
    constructor (previousOperandTextElement, currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear () {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete () {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber (number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation (operation) {
        if(this.currentOperand === '') return;
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        console.log('operation is : ', this.operation);
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);        
        const current = parseFloat(this.currentOperand);        
        if(isNaN(prev) || isNaN(current)) return;
        console.log('the operation is ' + this.operation);
        console.log('the previous operand is ' + this.previousOperand);
        console.log('the current operand is ' + this.currentOperand);
        switch (this.operation) {
            case '+':
                computation = prev + current;
                console.log(computation);
                break;
            case '-':
                computation = prev - current;
                console.log(computation);
                break;
            case '*':
                computation = prev * current;
                console.log(computation);
                break;
            case '/':
                computation = prev / current;
                console.log(computation);
                break;
        
            default:
                console.log("compute function returned");
                return;
        }
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = '';
        console.log('the previous operand is ' + this.previousOperand);
        console.log('the current operand is ' + this.currentOperand);
    }

    getDisplayNumber(number) {
        let stringNumber = number.toString();
        let integerDigits = parseFloat(stringNumber.split('.')[0]); 
        let decimalDigits = stringNumber.split('.')[1]; 
        let integerDisplay = '';
        if (isNaN(integerDigits)) {
            integerDigits = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(integerDigits === '' && isNaN(decimalDigits)){
            return stringNumber;
        }
        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }else {
            return integerDisplay;
        }

        // const floatNumber = parseFloat(number);
        // if(isNaN(floatNumber)) return '';
        // return floatNumber.toLocaleString('en');
    }

    updateDisplay () {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        console.log('this si current op text el : ',this.currentOperandTextElement.innerText);
        if(this.operation != null){
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} 
            ${this.getDisplayNumber(this.operation)}`;
        }else{
            this.previousOperandTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const resetButton = document.querySelector("[data-reset]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

resetButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})