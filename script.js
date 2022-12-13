class Calculator {
    constructor(previousDisplay, currentDisplay) {
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
    }

    clearAll() {
        this.previousDisplay.innerHTML = '';
        this.currentDisplay.innerHTML = '';
    }

    clearLastEntry () {
        this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.slice(0, -1);
        if(this.currentDisplay.innerHTML == '') {
            this.currentDisplay.innerHTML = this.previousDisplay.innerHTML;
            this.previousDisplay.innerHTML = '';
        }
    }

    displayDot(e) {
        if(!this.currentDisplay.innerHTML.includes('.')) {
            this.currentDisplay.innerHTML = this.currentDisplay.innerHTML + e.target.innerHTML;
        }
        else {
            return;
        }
    }

    displayOperands(e) {
        this.currentDisplay.innerHTML += e.target.innerHTML;
    }

    displayNegative(e) {
        const hasNumber = /\d/;
        const hasNotANumber = /[^0-9]/g;

        if(!this.previousDisplay.innerHTML == '')  {
            this.currentDisplay.innerHTML = '';
            if(
            this.previousDisplay.innerHTML.includes('x') ||
            this.previousDisplay.innerHTML.includes('÷') || 
            this.previousDisplay.innerHTML.includes('%') &&
            this.currentDisplay.innerHTML == '') {

                this.currentDisplay.innerHTML = '-';
                
            }
            else if(
            this.previousDisplay.innerHTML.includes('+') || 
            this.previousDisplay.innerHTML.includes('-') &&
            this.currentDisplay.innerHTML == '') {

                this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('+', e.target.innerHTML);

            }
        }
        else if(this.currentDisplay.innerHTML == '') {
            this.currentDisplay.innerHTML = '-';
        }
    }

    displayOperators(e) {
        const hasNumber = /\d/;
        const hasNotANumber = /[^0-9]/g;

        if(hasNumber.test(this.currentDisplay.innerHTML) == true) {
            this.previousDisplay.innerHTML = this.currentDisplay.innerHTML + e.target.innerHTML;
            this.currentDisplay.innerHTML = '';
        }
    }

    compute() {
        if(this.previousDisplay.innerHTML.includes('+')) {
            this.currentDisplay.innerHTML = parseFloat(this.previousDisplay.innerHTML) + parseFloat(this.currentDisplay.innerHTML);
            this.currentDisplay.innerHTML = Math.round(this.currentDisplay.innerHTML * 100) / 100;
            this.previousDisplay.innerHTML = '';
        }
        else if(this.previousDisplay.innerHTML.includes('-')) {
            this.currentDisplay.innerHTML = parseFloat(this.previousDisplay.innerHTML) - parseFloat(this.currentDisplay.innerHTML);
            this.currentDisplay.innerHTML = Math.round(this.currentDisplay.innerHTML * 100) / 100;
            this.previousDisplay.innerHTML = '';
        }
        else if(this.previousDisplay.innerHTML.includes('x')) {
            this.currentDisplay.innerHTML = parseFloat(this.previousDisplay.innerHTML) * parseFloat(this.currentDisplay.innerHTML);
            this.currentDisplay.innerHTML = Math.round(this.currentDisplay.innerHTML * 100) / 100;
            this.previousDisplay.innerHTML = '';
        }
        else if(this.previousDisplay.innerHTML.includes('÷')) {
            this.currentDisplay.innerHTML = parseFloat(this.previousDisplay.innerHTML) / parseFloat(this.currentDisplay.innerHTML);
            this.currentDisplay.innerHTML = Math.round(this.currentDisplay.innerHTML * 100) / 100;
            this.previousDisplay.innerHTML = '';
        }
    }
}


const operandButtons = document.querySelectorAll('[data-type="operand"]');
const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const negativeButton = document.querySelector('[data-mode="negative"]');
const allClearButton = document.querySelector('[data-type="all-clear"]');
const clearEntryButton = document.querySelector('[data-type="clear-entry"]');
const dotButton = document.querySelector('[data-type="dot"]');
const equalButton = document.querySelector('[data-type="equal"]');
const previousDisplayText = document.querySelector('[data-type="previous-display"]');
const currentDisplayText = document.querySelector('[data-type="current-display"]');


const calculator = new Calculator(previousDisplayText, currentDisplayText);

operandButtons.forEach(x => {
    x.addEventListener('click', (e) => {
        calculator.displayOperands(e);  
    })
})

operatorButtons.forEach(x => {
    x.addEventListener('click', (e) => {
        calculator.displayOperators(e);

        /* styles for previous-display */
        previousDisplayText.style.opacity = '0.9';
    })
        /* and here */
    x.addEventListener('mousedown', () => {
            previousDisplayText.style.transition = '0.2s';
            previousDisplayText.style.opacity = '0.8';
    })
})

negativeButton.addEventListener('click', (e) => {
    calculator.displayNegative(e);
})

allClearButton.addEventListener('click', () => {
    calculator.clearAll();
})

clearEntryButton.addEventListener('click', () => {
    calculator.clearLastEntry();
})

dotButton.addEventListener('click', (e) => {
    calculator.displayDot(e);
})

equalButton.addEventListener('click', () => {
    calculator.compute();
})