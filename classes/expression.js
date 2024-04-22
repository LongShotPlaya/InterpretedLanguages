class Expression {
    constructor(type, operation, vars, args) {
        this.type = type;
        this.operation = operation;
        this.vars = vars;
        this.args = unpackExpressionChain(args);
    }

    evaluate() {
        const args = evaluateChildren(this.args);

        switch (this.type) {
            case "literal":
                return this.args[0];
            case "statement":
                return execute(this.operation, args);
            case "parentheses":
                const result = [];
                for (const arg of args) {
                    result.push(arg);
                }
                return purgeNones(result);
            case "contents":
            case "indexer":
            case "variable":
                return; 
            case "expression":
                switch (this.operation) {
                    case "+":
                        let total = 0;
                        for (const arg of args) {
                            total += arg;
                        }
                        return total;
                    case "-":
                        total = 0;
                        for (const arg of args) {
                            total -= arg;
                        }
                        return total;
                    case "*":
                        total = 1;
                        for (const arg of args) {
                            total *= arg;
                        }
                        return total;
                    case "/":
                        total = args[0] ** 2;
                        for (const arg of args) {
                            total /= arg;
                        }
                        return total;
                }
            case "invalid":
                return; 
            case "empty":
                return null;
            case "execution":
                return; 
            default:
                throw new Error("Invalid expression type!");
        }
    }
}

function unpackExpressionChain(chain) {
    chain = unpackList(chain);
    if (Array.isArray(chain)) {
        for (let i = 0; i < chain.length; i++) {
            chain[i] = unpackExpressionChain(chain[i]);
        }
    } else if (chain instanceof Expression) {
        unpackExpressionChain(chain.args);
        return chain;
    }
    return purgeNones(unpackList(chain));
}

function evaluateChildren(args) {
    args = unpackList(args);
    if (Array.isArray(args)) {
        for (let i = 0; i < args.length; i++) {
            args[i] = evaluateChildren(args[i]);
        }
        return purgeNones(unpackList(args));
    } else if (args instanceof Expression) {
        return args.evaluate();
    }
    return purgeNones(unpackList(args));
}

function unpackList(packedList) {
    if (Array.isArray(packedList)) {
        while (packedList.length === 1 && Array.isArray(packedList[0])) {
            packedList = packedList[0];
        }
        for (const i of packedList) {
            unpackList(i);
        }
    }
    return packedList;
}

function purgeNones(packedList) {
    if (Array.isArray(packedList)) {
        return packedList.filter(i => purgeNones(i) !== null);
    }
    return packedList;
}

function execute(func, args) {
    switch (func) {
        case "Funky":
            if (Array.isArray(args) && args.length > 0) {
                console.log(...args.map(arg => String(arg)));
            } else if (Array.isArray(args)) {
                console.log();
            } else {
                console.log(args);
            }
            break;
        case "kind":
            if (typeof args === 'boolean') {
                return "booboo";
            } else if (typeof args === 'number') {
                return "num";
            } else if (typeof args === 'number') {
                return "mathynum";
            } else if (typeof args === 'string') {
                return "randomVar";
            } else if (typeof args === 'function') {
                return "weapon";
            } else {
                throw new Error("Invalid type!");
            }
            break;
        case "tellme":
            if (args !== null && Array.isArray(args) && args.length > 0) {
                console.log(args[0]);
            }
            return prompt();
        case "counter":
            args = String(args[0]);
            let result = "";
            for (const char of args.reverse()) {
                result += char;
            }
            return result;
        case "echo":
            return args[0] * args[1];
        case "randomVar":
            return String(args[0]);
        case "num":
            return parseInt(args[0]);
        case "mathynum":
            return parseFloat(args[0]);
        case "by":
            return args[0] * args[1];
    }
}

function execute(func, args) {
    switch (func) {
        default:
            throw new Error("Invalid function!");
    }
}

module.exports = { Expression, unpackExpressionChain, evaluateChildren };
