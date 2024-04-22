// lexer.js

class Token {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class Lexer {
    constructor(input) {
        this.input = input;
        this.position = 0;
        this.currentChar = this.input[0];
        this.keywords = ['HelloWorld', 'cat', 'repeater', 'reverse', 'multiply'];
    }

    advance() {
        this.position++;
        if (this.position < this.input.length) {
            this.currentChar = this.input[this.position];
        } else {
            this.currentChar = null;
        }
    }

    skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    isAlphaNumeric(char) {
        return /[a-zA-Z0-9_]/.test(char);
    }

    tokenize() {
        const tokens = [];

        while (this.currentChar !== null) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (this.isAlphaNumeric(this.currentChar)) {
                let identifier = '';
                while (this.currentChar !== null && this.isAlphaNumeric(this.currentChar)) {
                    identifier += this.currentChar;
                    this.advance();
                }
                if (this.keywords.includes(identifier)) {
                    tokens.push(new Token('KEYWORD', identifier));
                } else {
                    tokens.push(new Token('IDENTIFIER', identifier));
                }
                continue;
            }

            if (this.currentChar === ';') {
                tokens.push(new Token('SEMICOLON', ';'));
                this.advance();
                continue;
            }

            throw new Error(`Invalid character: ${this.currentChar}`);
        }

        return tokens;
    }
}

module.exports = { Lexer, Token };
