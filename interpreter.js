import Lexer from './Lexer';
import Parser from './Parser';

class Interpreter {
    constructor(text) {
        this.lexer = new Lexer(text);
        this.parser = new Parser(this.lexer);
    }

    interpret() {
        return this.parser.parse();
    }
}

export default Interpreter;


