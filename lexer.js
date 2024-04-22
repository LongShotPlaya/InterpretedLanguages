class Lexer {
    constructor(inputCode) {
        this.inputCode = inputCode.trim(); // Remove leading and trailing whitespace
        this.currentPosition = 0;
        this.tokens = [];
    }

    tokenize() {
        while (this.currentPosition < this.inputCode.length) {
            const currentChar = this.inputCode[this.currentPosition];

            if (currentChar === '(' || currentChar === ')' || currentChar === ';' || currentChar === '"' || currentChar === ',') {
                this.tokens.push({ type: 'PUNCTUATION', value: currentChar });
                this.currentPosition++;
            } else if (currentChar === '*') {
                this.tokens.push({ type: 'OPERATOR', value: '*' });
                this.currentPosition++;
            } else if (currentChar.match(/[a-zA-Z]/)) {
                let identifier = '';
                while (this.currentPosition < this.inputCode.length && this.inputCode[this.currentPosition].match(/[a-zA-Z]/)) {
                    identifier += this.inputCode[this.currentPosition];
                    this.currentPosition++;
                }
                this.tokens.push({ type: 'IDENTIFIER', value: identifier });
            } else if (currentChar.match(/[0-9]/)) { // Handle numeric literals
                let number = '';
                while (this.currentPosition < this.inputCode.length && this.inputCode[this.currentPosition].match(/[0-9]/)) {
                    number += this.inputCode[this.currentPosition];
                    this.currentPosition++;
                }
                this.tokens.push({ type: 'NUMBER', value: parseInt(number) });
            } else if (currentChar === '\'' || currentChar === '"') { // Handle string literals
                let stringLiteral = '';
                const quoteType = currentChar;
                this.currentPosition++; // Move past the opening quote
                while (this.currentPosition < this.inputCode.length && this.inputCode[this.currentPosition] !== quoteType) {
                    stringLiteral += this.inputCode[this.currentPosition];
                    this.currentPosition++;
                }
                if (this.inputCode[this.currentPosition] !== quoteType) {
                    throw new Error('Unterminated string literal');
                }
                this.currentPosition++; // Move past the closing quote
                this.tokens.push({ type: 'STRING', value: quoteType + stringLiteral + quoteType });
            } else if (currentChar === ' ') {
                // Skip spaces
                while (this.currentPosition < this.inputCode.length && this.inputCode[this.currentPosition] === ' ') {
                    this.currentPosition++;
                }
            } else {
                console.log('Unexpected character:', currentChar); // Add logging
                throw new Error(`Unexpected character: ${currentChar}`);
            }
        }
        return this.tokens;
    }    
}

module.exports = Lexer;
