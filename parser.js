class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.currentTokenIndex = 0;
        this.currentToken = this.tokens[0];
    }

    eat(type) {
        if (this.currentToken.type === type) {
            console.log(`Eating token of type: ${type}`);
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
    
        console.log('Current token:', token); // Log the current token
        console.log('Current token type:', token.type); // Log the current token type
    
        if (token.type === 'IDENTIFIER') {
            console.log('Parsing identifier');
            this.eat('IDENTIFIER');
            if (this.currentToken.type === 'LPAREN') {
                console.log('LPAREN found');
                this.eat('LPAREN');
                const result = this.parse();
                if (this.currentToken.type === 'RPAREN') { // Check for RPAREN after parsing arguments
                    console.log('RPAREN found after arguments');
                    this.eat('RPAREN');
                    return result;
                } else {
                    throw new Error(`Expected RPAREN, got ${this.currentToken.type}`);
                }
            } else {
                console.log('No LPAREN found');
                return [token.value];
            }
        } else if (token.type === 'OPERATOR') {
            console.log('Parsing operator');
            this.eat('OPERATOR');
            return [token.value];
        } else if (token.type === 'STRING') {
            console.log('Parsing string');
            this.eat('STRING');
            if (this.currentToken.type === 'RPAREN' || this.currentToken.type === 'COMMA') {
                console.log('RPAREN or COMMA found after string');
                this.eat(this.currentToken.type); // Consume RPAREN or COMMA token
                return [token.value];
            } else {
                throw new Error(`Expected RPAREN or COMMA, got ${this.currentToken.type}`);
            }
        } else if (token.type === 'NUMBER') { // Handle NUMBER tokens
            console.log('Parsing number');
            this.eat('NUMBER');
            return [token.value];
        } else if (token.type === 'LPAREN') {
            console.log('LPAREN found, parsing subexpression');
            this.eat('LPAREN');
            const result = this.parse();
            if (this.currentToken.type === 'RPAREN') { // Check for RPAREN after parsing subexpression
                console.log('RPAREN found after subexpression');
                this.eat('RPAREN');
                return result;
            } else {
                throw new Error(`Expected RPAREN, got ${this.currentToken.type}`);
            }
        } else if (token.type === 'SEMICOLON') {
            console.log('Parsing semicolon');
            this.eat('SEMICOLON');
            return [];
        } else {
            throw new Error(`Invalid statement: ${token.type}`);
        }
    }
    
    
    parse() {
        console.log('Parsing tokens...');
        const statements = [];
        while (this.currentToken !== null) {
            statements.push(this.parseStatement());
        }
        return statements;
    }
}

module.exports = Parser;
