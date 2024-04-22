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
    
        console.log('Current token type:', token.type); // Add logging
    
        if (token.type === 'IDENTIFIER') {
            this.eat('IDENTIFIER');
            if (this.currentToken.type === 'LPAREN') {
                this.eat('LPAREN');
                const result = this.parse();
                this.eat('RPAREN');
                return result;
            } else {
                return [token.value];
            }
        } else if (token.type === 'OPERATOR') {
            this.eat('OPERATOR');
            return [token.value];
        } else if (token.type === 'STRING') { // Handle string tokens
            this.eat('STRING');
            return [token.value];
        } else if (token.type === 'LPAREN') {
            this.eat('LPAREN');
            const result = this.parse();
            this.eat('RPAREN');
            return result;
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
