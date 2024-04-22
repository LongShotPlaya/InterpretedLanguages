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
    
        // Log the current token type
        console.log('Current token type:', token.type);
    
        if (token.type === 'IDENTIFIER') {
            this.eat('IDENTIFIER');
            if (this.currentToken.type === 'LPAREN') {
                this.eat('LPAREN');
                const result = this.parse();
                if (this.currentToken.type === 'RPAREN') { // Check for RPAREN after parsing arguments
                    this.eat('RPAREN');
                    return result;
                } else {
                    throw new Error(`Expected RPAREN, got ${this.currentToken.type}`);
                }
            } else {
                return [token.value];
            }
        } else if (token.type === 'OPERATOR') {
            this.eat('OPERATOR');
            return [token.value];
        } else if (token.type === 'STRING') {
            this.eat('STRING');
            return [token.value];
        } else if (token.type === 'LPAREN') {
            this.eat('LPAREN');
            const result = this.parse();
            if (this.currentToken.type === 'RPAREN') { // Check for RPAREN after parsing subexpression
                this.eat('RPAREN');
                return result;
            } else {
                throw new Error(`Expected RPAREN, got ${this.currentToken.type}`);
            }
        } else if (token.type === 'SEMICOLON') {
            this.eat('SEMICOLON');
            return [];
        } else {
            throw new Error(`Invalid statement: ${token.type}`);
        }
    }
    

    parse() {
        const statements = [];
        while (this.currentToken !== null) {
            statements.push(this.parseStatement());
        }
        return statements;
    }
}

module.exports = Parser;
