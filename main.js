var Calculator = /** @class */ (function () {
    function Calculator() {
    }
    Calculator.prototype.add = function (x, y) {
        return x + y;
    };
    Calculator.prototype.subtract = function (x, y) {
        return x - y;
    };
    Calculator.prototype.multiply = function (x, y) {
        return x * y;
    };
    Calculator.prototype.divide = function (x, y) {
        if (y === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return x / y;
    };
    Calculator.prototype.exponentiate = function (x, y) {
        return Math.pow(x, y);
    };
    Calculator.prototype.evaluateExpression = function (expression) {
        var _this = this;
        // Regular expression to match numbers, operators, and parentheses
        var regex = /(\d+|\+|\-|\*|\/|\(|\)|\^)/g;
        var tokens = expression.match(regex) || [];
        // Stacks for numbers and operators
        var numberStack = [];
        var operatorStack = [];
        // Function to perform operations based on precedence
        var performOperation = function () {
            var operator = operatorStack.pop();
            var y = numberStack.pop();
            var x = numberStack.pop();
            switch (operator) {
                case "+":
                    numberStack.push(_this.add(x, y));
                    break;
                case "-":
                    numberStack.push(_this.subtract(x, y));
                    break;
                case "*":
                    numberStack.push(_this.multiply(x, y));
                    break;
                case "/":
                    numberStack.push(_this.divide(x, y));
                    break;
                case "^":
                    numberStack.push(_this.exponentiate(x, y));
                    break;
                default:
                    throw new Error("Invalid operator: " + operator);
            }
        };
        // Iterate over tokens
        for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
            var token = tokens_1[_i];
            if (/\d/.test(token)) {
                numberStack.push(parseFloat(token));
            }
            else if (token === "(") {
                operatorStack.push(token);
            }
            else if (token === ")") {
                while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                    performOperation();
                }
                operatorStack.pop();
            }
            else {
                while (operatorStack.length &&
                    this.getPrecedence(operatorStack[operatorStack.length - 1]) >= this.getPrecedence(token)) {
                    performOperation();
                }
                operatorStack.push(token);
            }
        }
        // Perform remaining operations
        while (operatorStack.length) {
            performOperation();
        }
        return numberStack.pop();
    };
    Calculator.prototype.getPrecedence = function (operator) {
        switch (operator) {
            case "+":
            case "-":
                return 1;
            case "*":
            case "/":
                return 2;
            case "^":
                return 3;
            default:
                return 0;
        }
    };
    return Calculator;
}());
// Example usage:
var calc = new Calculator();
console.log("2 + 3 * (4 - 1) =", calc.evaluateExpression("2 + 3 * (4 - 1)"));
console.log("4^2 - 3 * 2 =", calc.evaluateExpression("4^2 - 3 * 2"));
