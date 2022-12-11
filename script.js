class Calculator {
    constructor(previousDisplay, currentDisplay) {
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
        this.clear();
    }

    clear() {
        this.previousDisplay = ''
        this.currentDisplay = ''
    }
}


const operandButtons = document.querySelectorAll('[data-type="operand"]');
const operationButtons = document.querySelectorAll('[data-type="operation"]');
const allClearButton = document.querySelector('[data-type="all-clear"]');
const clearEntryButton = document.querySelector('[data-type="clear-entry"]');
const dotButton = document.querySelector('[data-type="dot"]');
const equalButton = document.querySelector('[data-type="equal"]');
const previousDisplayText = document.querySelector('[data-type="previous-display"]');
const currentDisplayText = document.querySelector('[data-type="current-display"]');

const calculator = new Calculator(previousDisplayText, currentDisplayText);

operandButtons.forEach(x => {
    x.addEventListener('click', () => {
        currentDisplayText.innerHTML = 9;
    })
})

allClearButton.addEventListener('click', () => {
    clear();
})

console.log(allClearButton)