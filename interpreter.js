class Interpreter {
    interpret(statement) {
        if (Array.isArray(statement)) {
            const result = [];
            for (const item of statement) {
                if (item.name === 'cat') {
                    result.push(this.catFunction(item.arguments));
                } else if (item.name === 'multiply') {
                    result.push(this.multiplyFunction(item.arguments));
                } else {
                    throw new Error(`Unknown function: ${item.name}`);
                }
            }
            return result;
        } else {
            return statement;
        }
    }

    catFunction(params) {
        if (params.length !== 1) {
            throw new Error('cat function expects exactly one parameter');
        }
        // Remove extra quotes if present
        const value = params[0].startsWith('"') && params[0].endsWith('"')
            ? params[0].slice(1, -1)
            : params[0];
        return value;
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
