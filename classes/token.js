class Token {
    constructor(string, value, type, location) {
        this.string = string;
        this.value = value;
        this.type = type;
        this.location = location;
    }

    static invalidToken(string, location) {
        return new Token(string, string, "invalid", location);
    }

    toString() {
        return `<${this.type} token: "${this.string === ' ' ? '<space>' : this.string}" at ${this.location}>`;
    }
}

module.exports = Token;
