class Calculator {
    add(x: number, y: number): number {
        return x + y;
    }

    subtract(x: number, y: number): number {
        return x - y;
    }

    multiply(x: number, y: number): number {
        return x * y;
    }

    divide(x: number, y: number): number {
        if (y === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return x / y;
    }

    exponentiate(x: number, y: number): number {
        return Math.pow(x, y);
    }

    evaluateExpression(expression: string): number {
        // Regular expression to match numbers, operators, and parentheses
        const regex = /(\d+|\+|\-|\*|\/|\(|\)|\^)/g;
        const tokens = expression.match(regex) || [];

        // Stacks for numbers and operators
        const numberStack: number[] = [];
        const operatorStack: string[] = [];

        // Function to perform operations based on precedence
        const performOperation = () => {
            const operator = operatorStack.pop();
            const y = numberStack.pop()!;
            const x = numberStack.pop()!;
            switch (operator) {
                case "+":
                    numberStack.push(this.add(x, y));
                    break;
                case "-":
                    numberStack.push(this.subtract(x, y));
                    break;
                case "*":
                    numberStack.push(this.multiply(x, y));
                    break;
                case "/":
                    numberStack.push(this.divide(x, y));
                    break;
                case "^":
                    numberStack.push(this.exponentiate(x, y));
                    break;
                default:
                    throw new Error("Invalid operator: " + operator);
            }
        };

        // Iterate over tokens
        for (const token of tokens) {
            if (/\d/.test(token)) {
                numberStack.push(parseFloat(token));
            } else if (token === "(") {
                operatorStack.push(token);
            } else if (token === ")") {
                while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                    performOperation();
                }
                operatorStack.pop();
            } else {
                while (
                    operatorStack.length &&
                    this.getPrecedence(operatorStack[operatorStack.length - 1]) >= this.getPrecedence(token)
                ) {
                    performOperation();
                }
                operatorStack.push(token);
            }
        }

        // Perform remaining operations
        while (operatorStack.length) {
            performOperation();
        }

        return numberStack.pop()!;
    }

    private getPrecedence(operator: string): number {
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
    }
}

// Example usage:
const calc = new Calculator();
console.log("2 + 3 * (4 - 1) =", calc.evaluateExpression("2 + 3 * (4 - 1)"));
console.log("4^2 - 3 * 2 =", calc.evaluateExpression("4^2 - 3 * 2"));
