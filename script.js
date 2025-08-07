let display = document.getElementById('display');
        let currentInput = '0';
        let operator = null;
        let waitingForOperand = false;

        function updateDisplay() {
            display.textContent = currentInput;
        }

        function appendNumber(num) {
            if (waitingForOperand) {
                currentInput = num;
                waitingForOperand = false;
            } else {
                if (currentInput === '0') {
                    currentInput = num;
                } else {
                    currentInput += num;
                }
            }
            updateDisplay();
        }
 function appendOperator(nextOperator) {
            const inputValue = parseFloat(currentInput);

            if (previousInput === null) {
                previousInput = inputValue;
            } else if (operator) {
                const currentValue = previousInput || 0;
                const newValue = performCalculation(currentValue, inputValue, operator);

                currentInput = String(newValue);
                previousInput = newValue;
                updateDisplay();
            }

            waitingForOperand = true;
            operator = nextOperator;
        }

        function calculate() {
            const inputValue = parseFloat(currentInput);
  if (previousInput !== null && operator) {
                const newValue = performCalculation(previousInput, inputValue, operator);
                currentInput = String(newValue);
                previousInput = null;
                operator = null;
                waitingForOperand = true;
                updateDisplay();
            }
        }

        function performCalculation(firstOperand, secondOperand, operator) {
            switch (operator) {
                case '+':
                    return firstOperand + secondOperand;
                case '-':
                    return firstOperand - secondOperand;
                case '*':
                    return firstOperand * secondOperand;
                case '/':
                    return secondOperand !== 0 ? firstOperand / secondOperand : 0;
                default:
                    return secondOperand;
            }
        }
function clearDisplay() {
            currentInput = '0';
            previousInput = null;
            operator = null;
            waitingForOperand = false;
            updateDisplay();
        }

        function clearEntry() {
            currentInput = '0';
            updateDisplay();
        }

        let previousInput = null;

        // Keyboard support
        document.addEventListener('keydown', function(event) {
 const key = event.key;
            
            if (key >= '0' && key <= '9' || key === '.') {
                appendNumber(key);
            } else if (key === '+' || key === '-') {
                appendOperator(key);
            } else if (key === '*') {
                appendOperator('*');
            } else if (key === '/') {
                event.preventDefault();
                appendOperator('/');
            } else if (key === 'Enter' || key === '=') {
                calculate();
            } else if (key === 'Escape') {
                clearDisplay();
            } else if (key === 'Backspace') {
                clearEntry();
            }
        });
