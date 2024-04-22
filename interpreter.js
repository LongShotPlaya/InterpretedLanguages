class Interpreter {
    interpret(statement) {
        if (Array.isArray(statement)) {
            const functionName = statement.shift();
            if (functionName === 'cat') {
                return this.catFunction(statement);
            } else if (functionName === 'repeat') {
                return this.repeatFunction(statement);
            } else if (functionName === 'reverse') {
                return this.reverseFunction(statement);
            } else if (functionName === 'multiply') {
                return this.multiplyFunction(statement);
            } else if (functionName === 'HelloWorld') {
                return this.HelloWorldFunction();
            } else {
                throw new Error(`Unknown function: ${functionName}`);
            }
        } else {
            return statement;
        }
    }

    catFunction(params) {
        if (params.length !== 1) {
            throw new Error('cat function expects exactly one parameter');
        }
        return params[0];
    }

    repeatFunction(params) {
        if (params.length !== 2) {
            throw new Error('repeat function expects exactly two parameters');
        }
        const [str, times] = params;
        return str.repeat(times);
    }

    reverseFunction(params) {
        if (params.length !== 1) {
            throw new Error('reverse function expects exactly one parameter');
        }
        return params[0].split('').reverse().join('');
    }

    multiplyFunction(params) {
        if (params.length !== 2) {
            throw new Error('multiply function expects exactly two parameters');
        }
        const [a, b] = params;
        return a * b;
    }

    HelloWorldFunction() {
        return 'Hello, World!';
    }
}

module.exports = Interpreter;
