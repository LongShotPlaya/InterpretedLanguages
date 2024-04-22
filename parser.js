// parser.js

class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.currentTokenIndex = 0;
        this.currentToken = this.tokens[0];
    }

    eat(type) {
        if (this.currentToken.type === type) {
            this.currentTokenIndex++;
            if (this.currentTokenIndex < this.tokens.length) {
                this.currentToken = this.tokens[this.currentTokenIndex];
            } else {
                this.currentToken = null;
            }
        } else {
            throw new Error(`Expected ${type}, got ${this.currentToken.type}`);
        }
    }

    parseStatement() {
        const token = this.currentToken;

        // Example: Handling KEYWORD token type
        if (token.type === 'KEYWORD') {
            // Process KEYWORD statement
            // For example, if 'HelloWorld' is a keyword, handle it here
            console.log('Found KEYWORD:', token.value);
            this.eat('KEYWORD');
        } else {
            throw new Error(`Invalid statement: ${token.type}`);
        }
    }

    parse() {
        while (this.currentToken !== null) {
            this.parseStatement();
        }
    }
}

module.exports = Parser;
