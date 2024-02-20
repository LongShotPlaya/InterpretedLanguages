const Lexer = require('./Lexer');
const Parser = require('./Parser');

class Interpreter {
    constructor(text) {
        this.lexer = new Lexer(text);
        this.parser = new Parser(this.lexer);
    }

    interpret() {
        return this.parser.parse();
    }
}

module.exports = Interpreter;


