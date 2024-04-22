class Interpreter {
    interpret(statement) {
        if (Array.isArray(statement)) {
            const functionName = statement.shift().name;
            const args = statement[0].arguments; // Extract arguments
            if (functionName === 'cat') {
                return this.catFunction(args);
            } else if (functionName === 'multiply') {
                return this.multiplyFunction(args);
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

    multiplyFunction(params) {
        if (params.length !== 2) {
            throw new Error('multiply function expects exactly two parameters');
        }
        const [a, b] = params;
        return a * b;
    }
}

module.exports = Interpreter;
