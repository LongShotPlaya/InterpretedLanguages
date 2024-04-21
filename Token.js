class Token {
    constructor(type, value) {
        this.type = type; // token type (e.g., INTEGER, PLUS, MINUS, EOF)
        this.value = value; // token value (e.g., 1, '+', '-')
    }
}

export default Token;
