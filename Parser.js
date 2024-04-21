import Token from './Token';

class Parser {
    constructor(lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    error() {
        throw new Error('Invalid syntax');
    }

    eat(tokenType) {
        if (this.currentToken.type === tokenType) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            this.error();
        }
    }

    factor() {
        const token = this.currentToken;
        if (token.type === 'INTEGER') {
            this.eat('INTEGER');
            return token.value;
        } else if (token.type === 'LPAREN') {
            this.eat('LPAREN');
            const result = this.expr();
            this.eat('RPAREN');
            return result;
        }
    }

    term() {
        let result = this.factor();

        while (['MULTIPLY', 'DIVIDE'].includes(this.currentToken.type)) {
            const token = this.currentToken;
            if (token.type === 'MULTIPLY') {
                this.eat('MULTIPLY');
                result *= this.factor();
            } else if (token.type === 'DIVIDE') {
                this.eat('DIVIDE');
                result /= this.factor();
            }
        }

        return result;
    }

    expr() {
        let result = this.term();

        while (['PLUS', 'MINUS'].includes(this.currentToken.type)) {
            const token = this.currentToken;
            if (token.type === 'PLUS') {
                this.eat('PLUS');
                result += this.term();
            } else if (token.type === 'MINUS') {
                this.eat('MINUS');
                result -= this.term();
            }
        }

        return result;
    }

    parse() {
        return this.expr();
    }
}

export default Parser;
