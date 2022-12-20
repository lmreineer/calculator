class Calculator {
    constructor(previousDisplay, currentDisplay) {
        this.previousDisplay = previousDisplay;
        this.currentDisplay = currentDisplay;
    }

    clearAll() {
        this.previousDisplay.innerHTML = '';
        this.currentDisplay.innerHTML = '𝟢';
    }

    clearLastEntry() {
        const hasNumber = /\d/;

        if (hasNumber.test(this.currentDisplay.innerHTML) == true) {
            this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.slice(0, -1);
            if (hasNumber.test(this.previousDisplay.innerHTML) == true) {
                if (this.currentDisplay.innerHTML == '') {
                    this.currentDisplay.innerHTML = this.previousDisplay.innerHTML.slice(0, -1);
                    this.previousDisplay.innerHTML = '';
                }
            } else if (this.currentDisplay.innerHTML == '') {
                this.currentDisplay.innerHTML = '𝟢';
            }
        } else if (hasNumber.test(this.currentDisplay.innerHTML) == false) {
            if (this.currentDisplay.innerHTML.includes('=')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('=', '𝟢');
            } else if (this.currentDisplay.innerHTML.includes('-')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('-', '𝟢');
            }
        } else if (!this.previousDisplay.innerHTML == '') {
            if (this.currentDisplay.innerHTML == '') {
                this.currentDisplay.innerHTML = this.previousDisplay.innerHTML;
                this.previousDisplay.innerHTML = '';
            }
        }
    }

    displayDot(e) {
        if (!this.currentDisplay.innerHTML.includes('.')) {
            this.currentDisplay.innerHTML = this.currentDisplay.innerHTML + e.target.innerHTML;
            if (this.currentDisplay.innerHTML.includes('𝟢')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('𝟢', '');
            }
        }
    }

    displayOperands(e) {
        const hasNoZero = /[1-9]/g;

        this.currentDisplay.innerHTML += e.target.innerHTML;
        if (hasNoZero.test(this.currentDisplay.innerHTML) == false) {
            if (e.target.innerHTML == '0') {
                this.currentDisplay.innerHTML = '𝟢';
            }
        } else if (this.currentDisplay.innerHTML.includes('𝟢')) {
            this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('𝟢', '');
        } else if (this.currentDisplay.innerHTML.includes('=')) {
            this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('=', '');
        }
    }

    displayModulo(e) {
        const hasNumber = /\d/;

        if (hasNumber.test(this.currentDisplay.innerHTML) == true) {
            if (this.previousDisplay.innerHTML == '') {
                this.previousDisplay.innerHTML = this.currentDisplay.innerHTML + e.target.innerHTML;
                this.currentDisplay.innerHTML = '';
                if (this.previousDisplay.innerHTML.includes('=')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('=', '');
                }
            } else if (!this.previousDisplay.innerHTML == '') {
                this.computeContinually(e);
            }
        } else if (this.previousDisplay.innerHTML.includes('+')) {
            if (!this.previousDisplay.innerHTML.includes('%')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('+', '%');
                }
            }
        } else if (this.previousDisplay.innerHTML.includes('-')) {
            if (!this.previousDisplay.innerHTML.includes('%')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('-', '%');
                }
            }
        } else if (this.previousDisplay.innerHTML.includes('x')) {
            if (!this.previousDisplay.innerHTML.includes('%')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('x', '%');
                }
            }
        } else if (this.previousDisplay.innerHTML.includes('÷')) {
            if (!this.previousDisplay.innerHTML.includes('%')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('÷', '%');
                }
            }
        }
    }

    displaySum(e) {
        const hasNumber = /\d/;

        if (hasNumber.test(this.currentDisplay.innerHTML) == true) {
            if (this.previousDisplay.innerHTML == '') {
                this.previousDisplay.innerHTML = this.currentDisplay.innerHTML + e.target.innerHTML;
                this.currentDisplay.innerHTML = '';
                if (this.previousDisplay.innerHTML.includes('=')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('=', '');
                }
            } else if (this.previousDisplay.innerHTML.includes('=')) {
                this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('=', '');
            } else if (!this.previousDisplay.innerHTML == '') {
                this.computeContinually(e);
            }
        } else if (this.previousDisplay.innerHTML.includes('%')) {
            if (this.previousDisplay.innerHTML.includes('-')) {
                if (!this.previousDisplay.innerHTML.includes('x')) { // flex-wrap works here, in this part
                    if (!this.previousDisplay.innerHTML.includes('÷')) {
                        if (!this.currentDisplay.innerHTML.includes('-')) {
                            this.previousDisplay.innerHTML = this.previousDisplay.innerHTML + e.target.innerHTML;
                            this.currentDisplay.innerHTML = '';
                        } else if (this.currentDisplay.innerHTML.includes('-')) {
                            if (!this.previousDisplay.innerHTML.includes('+')) {
                                this.previousDisplay.innerHTML = this.previousDisplay.innerHTML + e.target.innerHTML; // both of this part duplicates '+'
                                this.currentDisplay.innerHTML = '';
                            }
                        }
                    }
                }
            } else if (this.previousDisplay.innerHTML.includes('x')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('x', e.target.innerHTML);
                }
            } else if (this.previousDisplay.innerHTML.includes('÷')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('÷', e.target.innerHTML);
                }
            } else if (!this.previousDisplay.innerHTML.includes('x')) {
                if (this.currentDisplay.innerHTML.includes('-')) {
                    if (!this.previousDisplay.innerHTML.includes('+')) {
                        if (!this.previousDisplay.innerHTML.includes('÷')) {
                            this.previousDisplay.innerHTML = this.previousDisplay.innerHTML + e.target.innerHTML;
                            this.currentDisplay.innerHTML = '';
                        }
                    }
                } else if (!this.previousDisplay.innerHTML.includes('÷')) {
                    if (!this.previousDisplay.innerHTML.includes('-')) {
                        if (!this.previousDisplay.innerHTML.includes('+')) {
                            this.previousDisplay.innerHTML = this.previousDisplay.innerHTML + e.target.innerHTML;
                        }
                    }
                }
            }
        } else if (!this.previousDisplay.innerHTML.includes('%')) {
            if (!this.previousDisplay.innerHTML.includes('x')) {
                if (!this.previousDisplay.innerHTML.includes('÷')) {
                    if (this.previousDisplay.innerHTML.includes('-')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.slice(0, -2) + e.target.innerHTML;
                    }
                } else if (this.previousDisplay.innerHTML.includes('÷')) {
                    if (!this.currentDisplay.innerHTML.includes('-')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('÷', e.target.innerHTML);
                    }
                }
            } else if (this.previousDisplay.innerHTML.includes('x')) {
                if (this.previousDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('x', e.target.innerHTML);
                    if (this.previousDisplay.innerHTML.includes('+')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.slice(0, -1);
                    }
                } else if (!this.previousDisplay.innerHTML.includes('-')) {
                    if (!this.currentDisplay.innerHTML.includes('-')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('x', e.target.innerHTML);
                    }
                }
            }
        }
    }

    displayNegative(e) {
        const hasNumber = /\d/;

        if (!this.previousDisplay.innerHTML == '') {
            if (hasNumber.test(this.currentDisplay.innerHTML) == true) {
                this.computeContinually(e);
            } else if (
                (this.previousDisplay.innerHTML.includes('x'))
            || (this.previousDisplay.innerHTML.includes('÷'))) {
                this.currentDisplay.innerHTML = '-';
            } else if (this.previousDisplay.innerHTML.includes('%')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.currentDisplay.innerHTML = '-';
                    if (
                        (this.previousDisplay.innerHTML.includes('+'))
                    && (this.previousDisplay.innerHTML.includes('-'))) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('+', '');
                        this.currentDisplay.innerHTML = '-';
                    } else if (
                        (this.previousDisplay.innerHTML.includes('+'))
                    && (!this.previousDisplay.innerHTML.includes('-'))) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('+', '');
                    }
                }
            } else if (!this.previousDisplay.innerHTML.includes('%')) {
                if (!this.previousDisplay.innerHTML.includes('-')) {
                    if (this.currentDisplay.innerHTML == '') {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.slice(0, -3) + e.target.innerHTML;
                    }
                } else if (this.previousDisplay.innerHTML.includes('-')) {
                    if (this.previousDisplay.innerHTML.includes('+')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.slice(0, -2) + e.target.innerHTML;
                    }
                }
            }
        } else if (
            (this.currentDisplay.innerHTML == '')
        || (this.currentDisplay.innerHTML == '𝟢')) {
            this.currentDisplay.innerHTML = '-';
        } else if (hasNumber.test(this.currentDisplay.innerHTML) == true) {
            if (this.previousDisplay.innerHTML == '') {
                this.previousDisplay.innerHTML = this.currentDisplay.innerHTML + e.target.innerHTML;
                this.currentDisplay.innerHTML = '';
                if (this.previousDisplay.innerHTML.includes('=')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('=', '');
                }
            } else if (this.previousDisplay.innerHTML.includes('=')) {
                this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('=', '');
            }
        }
    }

    displayOperators(e) {
        const hasNumber = /\d/;

        if (hasNumber.test(this.currentDisplay.innerHTML) == true) {
            if (this.previousDisplay.innerHTML == '') {
                this.previousDisplay.innerHTML = this.currentDisplay.innerHTML + e.target.innerHTML;
                this.currentDisplay.innerHTML = '';
                if (this.previousDisplay.innerHTML.includes('=')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('=', '');
                }
            } else if (this.previousDisplay.innerHTML.includes('=')) {
                this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('=', '');
            } else if (!this.previousDisplay.innerHTML == '') {
                this.computeContinually(e);
            }
        } else if (!this.previousDisplay.innerHTML == '') {
            if (!this.previousDisplay.innerHTML.includes('%')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    this.previousDisplay.innerHTML = this.previousDisplay.innerHTML;
                    if (this.previousDisplay.innerHTML.includes('-')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.slice(0, -2) + e.target.innerHTML;
                    } else if (this.previousDisplay.innerHTML.includes('+')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('+', e.target.innerHTML);
                    } else if (this.previousDisplay.innerHTML.includes('x')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('x', e.target.innerHTML);
                    } else if (this.previousDisplay.innerHTML.includes('÷')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('÷', e.target.innerHTML);
                    }
                }
            } else if (this.previousDisplay.innerHTML.includes('%')) {
                if (!this.currentDisplay.innerHTML.includes('-')) {
                    if (!this.previousDisplay.innerHTML.includes('+')) {
                        if (
                            (!this.previousDisplay.innerHTML.includes('x'))
                        && (!this.previousDisplay.innerHTML.includes('÷'))) {
                            this.previousDisplay.innerHTML = `${this.previousDisplay.innerHTML} x `;
                        } else if (
                            (!this.previousDisplay.innerHTML.includes('÷'))
                        && (!this.previousDisplay.innerHTML.includes('x'))) {
                            this.previousDisplay.innerHTML = `${this.previousDisplay.innerHTML} ÷ `;
                        } else if (
                            (this.previousDisplay.innerHTML.includes('x'))
                        && (!this.previousDisplay.innerHTML.includes('÷'))) {
                            this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('x', e.target.innerHTML);
                        } else if (
                            (this.previousDisplay.innerHTML.includes('÷'))
                        && (!this.previousDisplay.innerHTML.includes('x'))) {
                            this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('÷', e.target.innerHTML);
                        }
                    } else if (this.previousDisplay.innerHTML.includes('+')) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML.replace('+', e.target.innerHTML);
                    }
                }
                // logical syntax for adding modulo, if minus is applied it can be changed if
                // multiplication or division is applied before minus and minus is applied after, then it cannot be changed
                else if (this.currentDisplay.innerHTML.includes('-')) {
                    if (
                        (!this.previousDisplay.innerHTML.includes('x'))
                    && (!this.previousDisplay.innerHTML.includes('÷'))) {
                        this.previousDisplay.innerHTML = this.previousDisplay.innerHTML + e.target.innerHTML;
                        this.currentDisplay.innerHTML = '';
                    }
                }
            }
        }
    }

    compute() {
        const previousParsed = parseFloat(this.previousDisplay.innerHTML);
        const currentParsed = parseFloat(this.currentDisplay.innerHTML);

        if (this.previousDisplay.innerHTML.includes('+')) {
            const answer = previousParsed + currentParsed;
            this.currentDisplay.innerHTML = `= ${Math.round(answer * 100) / 100}`;

            this.previousDisplay.innerHTML = '';
            if (this.currentDisplay.innerHTML.includes('NaN')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('=', '');
            }
        } else if (this.previousDisplay.innerHTML.includes('-')) {
            const answer = previousParsed - currentParsed;
            this.currentDisplay.innerHTML = `= ${Math.round(answer * 100) / 100}`;

            this.previousDisplay.innerHTML = '';
            if (this.currentDisplay.innerHTML.includes('NaN')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('=', '');
            }
        } else if (this.previousDisplay.innerHTML.includes('x')) {
            const answer = previousParsed * currentParsed;
            this.currentDisplay.innerHTML = `= ${Math.round(answer * 100) / 100}`;

            this.previousDisplay.innerHTML = '';
            if (this.currentDisplay.innerHTML.includes('NaN')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('=', '');
            }
        } else if (this.previousDisplay.innerHTML.includes('÷')) {
            const answer = previousParsed / currentParsed;
            this.currentDisplay.innerHTML = `= ${Math.round(answer * 100) / 100}`;

            this.previousDisplay.innerHTML = '';
            if (this.currentDisplay.innerHTML.includes('NaN')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('=', '');
            }
        } else if (this.previousDisplay.innerHTML.includes('%')) {
            const answer = previousParsed % currentParsed;
            this.currentDisplay.innerHTML = `= ${Math.round(answer * 100) / 100}`;

            this.previousDisplay.innerHTML = '';
            if (this.currentDisplay.innerHTML.includes('NaN')) {
                this.currentDisplay.innerHTML = this.currentDisplay.innerHTML.replace('=', '');
            }
        }
    }

    computeContinually(e) {
        const previousParsed = parseFloat(this.previousDisplay.innerHTML);
        const currentParsed = parseFloat(this.currentDisplay.innerHTML);

        if (this.previousDisplay.innerHTML.includes('+')) {
            const answer = previousParsed + currentParsed;
            this.previousDisplay.innerHTML = Math.round(answer * 100) / 100 + e.target.innerHTML;

            this.currentDisplay.innerHTML = '';
        } else if (this.previousDisplay.innerHTML.includes('-')) {
            const answer = previousParsed - currentParsed;
            this.previousDisplay.innerHTML = Math.round(answer * 100) / 100 + e.target.innerHTML;

            this.currentDisplay.innerHTML = '';
        } else if (this.previousDisplay.innerHTML.includes('x')) {
            const answer = previousParsed * currentParsed;
            this.previousDisplay.innerHTML = Math.round(answer * 100) / 100 + e.target.innerHTML;

            this.currentDisplay.innerHTML = '';
        } else if (this.previousDisplay.innerHTML.includes('÷')) {
            const answer = previousParsed / currentParsed;
            this.previousDisplay.innerHTML = Math.round(answer * 100) / 100 + e.target.innerHTML;

            this.currentDisplay.innerHTML = '';
        } else if (this.previousDisplay.innerHTML.includes('%')) {
            const answer = previousParsed % currentParsed;
            this.previousDisplay.innerHTML = Math.round(answer * 100) / 100 + e.target.innerHTML;

            this.currentDisplay.innerHTML = '';
        }
    }

    computeContinuallyForKeyboard(e) {
        const previousParsed = parseFloat(previousDisplayText.innerHTML);
        const currentParsed = parseFloat(currentDisplayText.innerHTML);

        if (previousDisplayText.innerHTML.includes('+')) {
            const answer = previousParsed + currentParsed;
            previousDisplayText.innerHTML = `${Math.round(answer * 100) / 100} ${e.key} `;

            currentDisplayText.innerHTML = ' ';
        } else if (previousDisplayText.innerHTML.includes('-')) {
            const answer = previousParsed - currentParsed;
            previousDisplayText.innerHTML = `${Math.round(answer * 100) / 100} ${e.key} `;

            currentDisplayText.innerHTML = ' ';
        } else if (previousDisplayText.innerHTML.includes('x')) {
            const answer = previousParsed * currentParsed;
            previousDisplayText.innerHTML = `${Math.round(answer * 100) / 100} ${e.key} `;

            currentDisplayText.innerHTML = '';
        } else if (previousDisplayText.innerHTML.includes('÷')) {
            const answer = previousParsed / currentParsed;
            previousDisplayText.innerHTML = `${Math.round(answer * 100) / 100} ${e.key} `;

            currentDisplayText.innerHTML = ' ';
        } else if (previousDisplayText.innerHTML.includes('%')) {
            const answer = previousParsed % currentParsed;
            previousDisplayText.innerHTML = `${Math.round(answer * 100) / 100} ${e.key} `;

            currentDisplayText.innerHTML = ' ';
        }
    }
}

const operandButtons = document.querySelectorAll('[data-type="operand"]');
const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const negativeButton = document.querySelector('[data-mode="negative"]');
const sumButton = document.querySelector('[data-mode="sum"]');
const moduloButton = document.querySelector('[data-mode="modulo"]');
const allClearButton = document.querySelector('[data-type="all-clear"]');
const clearEntryButton = document.querySelector('[data-type="clear-entry"]');
const dotButton = document.querySelector('[data-type="dot"]');
const equalButton = document.querySelector('[data-type="equal"]');
const previousDisplayText = document.querySelector('[data-type="previous-display"]');
const currentDisplayText = document.querySelector('[data-type="current-display"]');

const calculator = new Calculator(previousDisplayText, currentDisplayText);

operandButtons.forEach((x) => {
    x.addEventListener('click', (e) => {
        calculator.displayOperands(e);

        if (currentDisplayText.innerHTML.includes('NaN')) {
            currentDisplayText.innerHTML = '';
            calculator.displayOperands(e);
        }
    });
});

operatorButtons.forEach((x) => {
    x.addEventListener('click', (e) => {
        calculator.displayOperators(e);

        /* styles for previous-display */
        previousDisplayText.style.opacity = '0.9';
    });
    /* and here */
    x.addEventListener('mousedown', () => {
        previousDisplayText.style.transition = '0.2s';
        previousDisplayText.style.opacity = '0.8';
    });
});

negativeButton.addEventListener('click', (e) => {
    calculator.displayNegative(e);
});

sumButton.addEventListener('click', (e) => {
    calculator.displaySum(e);
});

moduloButton.addEventListener('click', (e) => {
    calculator.displayModulo(e);
});

allClearButton.addEventListener('click', () => {
    calculator.clearAll();
});

clearEntryButton.addEventListener('click', () => {
    calculator.clearLastEntry();
});

dotButton.addEventListener('click', (e) => {
    calculator.displayDot(e);
});

equalButton.addEventListener('click', () => {
    calculator.compute();
});

// another version of previous code
document.addEventListener('keydown', (e) => {
    // similar to clearLastEntry()
    if (e.key == 'Backspace') {
        calculator.clearLastEntry(e);
    } else if (e.key == 'Escape') {
        calculator.clearAll();
    } else if ((e.key >= 0 && e.key <= 9)) {
        const hasNoZero = /[1-9]/g;

        currentDisplayText.innerHTML += e.key;
        if (hasNoZero.test(currentDisplayText.innerHTML) == false) {
            if (e.key == 0) {
                currentDisplayText.innerHTML = '𝟢';
            }
        } else if (currentDisplayText.innerHTML.includes('𝟢')) {
            currentDisplayText.innerHTML = currentDisplayText.innerHTML.replace('𝟢', '');
        } else if (currentDisplayText.innerHTML.includes('=')) {
            currentDisplayText.innerHTML = currentDisplayText.innerHTML.replace('=', '');
        }
    }

    // similar to displayDot(e)
    else if (e.key == '.') {
        if (!currentDisplayText.innerHTML.includes('.')) {
            currentDisplayText.innerHTML += e.key;
            if (currentDisplayText.innerHTML.includes('𝟢')) {
                currentDisplayText.innerHTML = currentDisplayText.innerHTML.replace('𝟢', '');
            }
        }
    }

    // the same code as displayModulo(e)
    else if (e.shiftKey && e.key == '%') {
        e.preventDefault();

        const hasNumber = /\d/;

        if (hasNumber.test(currentDisplayText.innerHTML) == true) {
            if (previousDisplayText.innerHTML == '') {
                previousDisplayText.innerHTML = `${currentDisplayText.innerHTML}%`;
                currentDisplayText.innerHTML = '';
                if (previousDisplayText.innerHTML.includes('=')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('=', '');
                }
            } else if (!previousDisplayText.innerHTML == '') {
                this.computeContinually(e);
            }
        } else if (previousDisplayText.innerHTML.includes('+')) {
            if (!previousDisplayText.innerHTML.includes('%')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('+', '%');
                }
            }
        } else if (previousDisplayText.innerHTML.includes('-')) {
            if (!previousDisplayText.innerHTML.includes('%')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('-', '%');
                }
            }
        } else if (previousDisplayText.innerHTML.includes('x')) {
            if (!previousDisplayText.innerHTML.includes('%')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('x', '%');
                }
            }
        } else if (previousDisplayText.innerHTML.includes('÷')) {
            if (!previousDisplayText.innerHTML.includes('%')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('÷', '%');
                }
            }
        }
    }

    // the same code as displaySum(e)
    else if (e.shiftKey && e.key == '+') {
        e.preventDefault();

        const hasNumber = /\d/;

        if (hasNumber.test(currentDisplayText.innerHTML) == true) {
            if (previousDisplayText.innerHTML == '') {
                previousDisplayText.innerHTML = `${currentDisplayText.innerHTML} + `;
                currentDisplayText.innerHTML = '';
                if (previousDisplayText.innerHTML.includes('=')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('=', '');
                }
            } else if (previousDisplayText.innerHTML.includes('=')) {
                previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('=', '');
            } else if (!previousDisplayText.innerHTML == '') {
                calculator.computeContinuallyForKeyboard(e);
            }
        } else if (previousDisplayText.innerHTML.includes('%')) {
            if (previousDisplayText.innerHTML.includes('-')) {
                if (!previousDisplayText.innerHTML.includes('x')) {
                    if (!previousDisplayText.innerHTML.includes('÷')) {
                        if (!currentDisplayText.innerHTML.includes('-')) {
                            previousDisplayText.innerHTML += ' + ';
                            currentDisplayText.innerHTML = '';
                        } else if (currentDisplayText.innerHTML.includes('-')) {
                            if (!previousDisplayText.innerHTML.includes('+')) {
                                previousDisplayText.innerHTML += ' + ';
                                currentDisplayText.innerHTML = '';
                            }
                        }
                    }
                }
            } else if (previousDisplayText.innerHTML.includes('x')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('x', ' + ');
                }
            } else if (previousDisplayText.innerHTML.includes('÷')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('÷', ' + ');
                }
            } else if (!previousDisplayText.innerHTML.includes('x')) {
                if (currentDisplayText.innerHTML.includes('-')) {
                    if (!previousDisplayText.innerHTML.includes('+')) {
                        if (!previousDisplayText.innerHTML.includes('÷')) {
                            previousDisplayText.innerHTML += ' + ';
                            currentDisplayText.innerHTML = '';
                        }
                    }
                } else if (!previousDisplayText.innerHTML.includes('÷')) {
                    if (!previousDisplayText.innerHTML.includes('-')) {
                        if (!previousDisplayText.innerHTML.includes('+')) {
                            previousDisplayText.innerHTML += ' + ';
                        }
                    }
                }
            }
        } else if (!previousDisplayText.innerHTML.includes('%')) {
            if (!previousDisplayText.innerHTML.includes('x')) {
                if (!previousDisplayText.innerHTML.includes('÷')) {
                    if (previousDisplayText.innerHTML.includes('-')) {
                        previousDisplayText.innerHTML = `${previousDisplayText.innerHTML.slice(0, -2)} + `;
                    }
                } else if (previousDisplayText.innerHTML.includes('÷')) {
                    if (!currentDisplayText.innerHTML.includes('-')) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('÷', ' + ');
                    }
                }
            } else if (previousDisplayText.innerHTML.includes('x')) {
                if (previousDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('x', ' + ');
                    if (previousDisplayText.innerHTML.includes('+')) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.slice(0, -1);
                    }
                } else if (!previousDisplayText.innerHTML.includes('-')) {
                    if (!currentDisplayText.innerHTML.includes('-')) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('x', ' + ');
                    }
                }
            }
        }
    }

    // the same code as displayNegative(e)
    else if (e.key == '-') {
        const hasNumber = /\d/;

        if (!previousDisplayText.innerHTML == '') {
            if (hasNumber.test(currentDisplayText.innerHTML) == true) {
                calculator.computeContinuallyForKeyboard(e);
            } else if (
                (previousDisplayText.innerHTML.includes('x'))
            || (previousDisplayText.innerHTML.includes('÷'))) {
                currentDisplayText.innerHTML = '-';
            } else if (previousDisplayText.innerHTML.includes('%')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    currentDisplayText.innerHTML = '-';
                    if (
                        (previousDisplayText.innerHTML.includes('+'))
                    && (previousDisplayText.innerHTML.includes('-'))) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('+', '');
                        currentDisplayText.innerHTML = '-';
                    } else if (
                        (previousDisplayText.innerHTML.includes('+'))
                    && (!previousDisplayText.innerHTML.includes('-'))) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('+', '');
                    }
                }
            } else if (!previousDisplayText.innerHTML.includes('%')) {
                if (!previousDisplayText.innerHTML.includes('-')) {
                    if (currentDisplayText.innerHTML == '') {
                        previousDisplayText.innerHTML = `${previousDisplayText.innerHTML.slice(0, -3)} ${e.key} `;
                    }
                } else if (previousDisplayText.innerHTML.includes('-')) {
                    if (previousDisplayText.innerHTML.includes('+')) {
                        previousDisplayText.innerHTML = `${previousDisplayText.innerHTML.slice(0, -2)} ${e.key} `;
                    }
                }
            }
        } else if (
            (currentDisplayText.innerHTML == '')
        || (currentDisplayText.innerHTML == '𝟢')) {
            currentDisplayText.innerHTML = '-';
        } else if (hasNumber.test(currentDisplayText.innerHTML) == true) {
            if (previousDisplayText.innerHTML == '') {
                previousDisplayText.innerHTML = `${currentDisplayText.innerHTML} ${e.key} `;
                currentDisplayText.innerHTML = '';
                if (previousDisplayText.innerHTML.includes('=')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('=', '');
                }
            } else if (previousDisplayText.innerHTML.includes('=')) {
                previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('=', '');
            }
        }
    }

    // the same code as displayOperators(e)
    else if (
        (e.shiftKey && e.key == '*')
    || (e.key == '/')) {
        const hasNumber = /\d/;

        if (hasNumber.test(currentDisplayText.innerHTML) == true) {
            if (previousDisplayText.innerHTML == '') {
                previousDisplayText.innerHTML = `${currentDisplayText.innerHTML} ${e.key} `;
                currentDisplayText.innerHTML = '';
                if (previousDisplayText.innerHTML.includes('=')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('=', '');
                }
            } else if (previousDisplayText.innerHTML.includes('=')) {
                previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('=', '');
            } else if (!previousDisplayText.innerHTML == '') {
                calculator.computeContinuallyForKeyboard(e);
            }
        } else if (!previousDisplayText.innerHTML == '') {
            if (!previousDisplayText.innerHTML.includes('%')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    previousDisplayText.innerHTML = previousDisplayText.innerHTML;
                    if (previousDisplayText.innerHTML.includes('-')) {
                        previousDisplayText.innerHTML = `${previousDisplayText.innerHTML.slice(0, -2)} ${e.key} `;
                    } else if (previousDisplayText.innerHTML.includes('+')) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('+', ` ${e.key} `);
                    } else if (previousDisplayText.innerHTML.includes('x')) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('x', ` ${e.key} `);
                    } else if (previousDisplayText.innerHTML.includes('÷')) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('÷', ` ${e.key} `);
                    }
                }
            } else if (previousDisplayText.innerHTML.includes('%')) {
                if (!currentDisplayText.innerHTML.includes('-')) {
                    if (!previousDisplayText.innerHTML.includes('+')) {
                        if (
                            (!previousDisplayText.innerHTML.includes('x'))
                        && (!previousDisplayText.innerHTML.includes('÷'))) {
                            previousDisplayText.innerHTML += ' x ';
                        } else if (
                            (!previousDisplayText.innerHTML.includes('÷'))
                        && (!previousDisplayText.innerHTML.includes('x'))) {
                            previousDisplayText.innerHTML += ' ÷ ';
                        } else if (
                            (previousDisplayText.innerHTML.includes('x'))
                        && (!previousDisplayText.innerHTML.includes('÷'))) {
                            previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('x', ` ${e.key} `);
                        } else if (
                            (previousDisplayText.innerHTML.includes('÷'))
                        && (!previousDisplayText.innerHTML.includes('x'))) {
                            previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('÷', ` ${e.key} `);
                        }
                    } else if (previousDisplayText.innerHTML.includes('+')) {
                        previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('+', ` ${e.key} `);
                    }
                }

                // same reason as the previous one
                else if (currentDisplayText.innerHTML.includes('-')) {
                    if (
                        (!previousDisplayText.innerHTML.includes('x'))
                    && (!previousDisplayText.innerHTML.includes('÷'))) {
                        previousDisplayText.innerHTML = `${previousDisplayText.innerHTML} ${e.key} `;
                        currentDisplayText.innerHTML = '';
                    }
                }
            }
        }
        if (previousDisplayText.innerHTML.includes('/')) {
            previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('/', '÷');
        } else if (previousDisplayText.innerHTML.includes('*')) {
            previousDisplayText.innerHTML = previousDisplayText.innerHTML.replace('*', 'x');
        }
    } else if (e.key == '=') {
        calculator.compute();
    }
});
