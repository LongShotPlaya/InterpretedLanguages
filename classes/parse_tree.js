// classes/parse_tree.js

const Token = require('./token');
const Expression = require('./expression');

class ParseTree {
    constructor(tokens, errors) {
        this.tokens = tokens;
        this.pointer = 0;
        this.variables = {};
        this.errors = errors;
        this.root = new Expression("execution", "execute", this.variables, [this.parse()]);
    }

    currToken() {
        return this.pointer >= this.tokens.length ? null : this.tokens[this.pointer];
    }

    nextToken() {
        this.pointer += 1;
        return this.currToken();
    }

    peek(amt) {
        this.pointer += amt;
        const val = this.currToken();
        this.pointer -= amt;
        return val;
    }

    evaluate() {
        return this.root.evaluate();
    }

    printErrors() {
        for (const error of this.errors) {
            console.log(error);
        }
    }

    printTree() {
        const printExp = (exp, prefix = "", hasNextSibling = false) => {
            const addPref = hasNextSibling ? "├── " : "└── ";
            if (exp instanceof Expression) {
                console.log(`${prefix + addPref}${exp.operation}`);
                const childrenPref = hasNextSibling ? "│   " : "    ";
                for (let i = 0; i < exp.args.length; i++) {
                    printExp(exp.args[i], prefix + childrenPref, i < exp.args.length - 1);
                }
            } else {
                console.log(`${prefix + addPref}${exp}`);
            }
        };
        printExp(this.root);
    }

    parse(kwargs = {}) {
        const defaultParams = {
            combine: true,
            inParen: false,
        };
        const params = {
            ...defaultParams,
            ...kwargs,
        };

        const submitEmpty = () => this.submitExp("empty", "empty", []);

        const submitInvalid = () => this.submitExp("invalid", "invalid", []);

        const submitParseExp = (type, op, kwargs) => {
            this.nextToken();
            return this.lookAhead(new Expression(type, op, this.variables, [this.parse(kwargs)]), params);
        };

        const submitExp = (type, op, args) => {
            this.nextToken();
            return this.lookAhead(new Expression(type, op, this.variables, args), params);
        };

        while (this.currToken() !== null) {
            const token = this.currToken();

            switch (token.type) {
                case "blah":
                    const word = token.string;
                    if (keywords[word] !== undefined) {
                        const keyword = keywords[word];
                        if (keyword instanceof Expression) {
                            const exp = new Expression(keyword.type, keyword.operation, this.variables, keyword.args);
                            exp.vars = this.variables;
                            switch (exp.type) {
                                case "statement":
                                    this.nextToken();
                                    if (this.expect("(") >= 0) {
                                        exp.args.push(submitExp("parentheses", "parentheses", [{...kwargs, combine: false}]));
                                        if (this.expect("{") >= 0) {
                                            exp.args.push(submitExp("contents", "contents", [{...kwargs, combine: false}]));
                                            return this.lookAhead(exp);
                                        } else {
                                            return submitExp("statement", exp.operation, [exp.args[0]]);
                                        }
                                    } else {
                                        return submitExp("literal", "type", ["weapon"]);
                                    }
                                case "literal":
                                    return this.lookAhead(exp);
                                case "binary":
                                    this.errors.push(`Thy left hand hath been lopped off at ${token.location}!`);
                            }
                        }
                    }
                    if (this.expect("(") >= 0) {
                        return submitParseExp("statement", word, {...kwargs, combine: false});
                    }
                    return submitExp("variable", "variable", [word]);
                case "mathynum":
                    return submitExp("literal", "mathynum", [token.value]);
                case "num":
                    return submitExp("literal", "num", [token.value]);
                case "booboo":
                    return submitExp("literal", "booboo", [token.value]);
                case "quote":
                    let value = "";
                    this.nextToken();
                    while (this.currToken() !== null && this.currToken().type !== "quote") {
                        value += this.currToken().string;
                        this.nextToken();
                    }
                    if (this.currToken() === null) {
                        this.errors.push(`Thou canst not defeat thine opponent lest thou finish thine battle cry at ${token.location}!`);
                    }
                    return submitExp("literal", "blah", [value]);
                case "comma":
                    this.errors.push(`Thou countest thine commas before they hatch at ${token.location}!`);
                    return submitInvalid();
                case "whitespace":
                    this.nextToken();
                    break;
                default:
                    const container = this.openContainer(token, submitParseExp, submitInvalid);
                    if (container !== null) {
                        return container;
                    }
                    const closeContainer = this.closeContainer(token, submitEmpty, submitInvalid, {...params});
                    if (closeContainer !== null) {
                        return closeContainer;
                    }
                    this.errors.push(`Canst thou not read? What thinkest thou of "${this.currToken().string}" at ${this.currToken().location}?`);
                    return submitInvalid();
            }
        }
        return null;
    }

    openContainer(token, submitParseExp, submitInvalid) {
        let exp = null;
        let match = "";
        switch (token.type) {
            case "open parenthesis":
                exp = submitParseExp("parentheses", "parentheses", {inParen: true});
                match = ")";
                break;
            case "open curly brace":
                exp = submitParseExp("contents", "contents", {inParen: true});
                match = "}";
                break;
            default:
                return null;
        }

        if (exp !== null && exp.length > 0 && (exp[exp.length - 1] === null || (exp[exp.length - 1].args.length > 0 && (exp[exp.length - 1].args[exp[exp.length - 1].args.length - 1] === null || exp[exp.length - 1].args[exp[exp.length - 1].args.length - 1].type === "empty")))) {
            console.log("Empty!");
            this.pointer -= 1;
        }

        const close = this.expect(match, ",", false);
        if (close >= 0) {
            this.pointer += close + 1;
            return exp;
        }

        this.errors.push(`Thou hast a hole in thy container at ${token.location}!`);
        return submitInvalid();
    }

    closeContainer(token, submitEmpty, submitInvalid, kwargs) {
        switch (token.type) {
            case "close parenthesis":
            case "close curly brace":
                break;
            default:
                return null;
        }

        if (kwargs.inParen && kwargs.combine) {
            return submitEmpty();
        }

        this.errors.push(`Thou mayest not finish what thou hast not started! Thou didst not open the container at ${token.location}!`);
        return submitInvalid();
    }

    expect(expected, ignore = "", matchCase = true) {
        const ignoreSet = new Set(ignore.split(""));
        const token = this.currToken();
        if (token === null) {
            return -1;
        }
        const val = matchCase ? expected === token.string : expected.toLowerCase() === token.string.toLowerCase();
        if (!val || ignoreSet.has(token.string)) {
            return -1;
        }
        return token.string.length - 1;
    }

    lookAhead(exp, kwargs) {
        if (kwargs.combine) {
            let comb = true;
            while (comb && this.peek(1) !== null) {
                switch (this.peek(1).type) {
                    case "whitespace":
                    case "comma":
                        this.nextToken();
                        break;
                    case "open parenthesis":
                    case "open curly brace":
                        if (exp.length === 0) {
                            this.nextToken();
                            exp.args.push(this.parse({...kwargs}));
                            comb = false;
                        } else {
                            comb = false;
                        }
                        break;
                    default:
                        comb = false;
                        break;
                }
            }
        }
        return exp;
    }
}

const keywords = {
    cry: new Expression("function", "cry", {}, []),
    kind: new Expression("function", "kind", {}, []),
    tellme: new Expression("function", "tellme", {}, []),
    counter: new Expression("function", "counter", {}, []),
    again: new Expression("function", "again", {}, []),
    blah: new Expression("function", "blah", {}, []),
    num: new Expression("function", "num", {}, []),
    mathynum: new Expression("function", "mathynum", {}, []),
    by: new Expression("function", "by", {}, []),
};

module.exports = ParseTree;
