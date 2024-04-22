const Lexer = require('./lexer');
const Parser = require('./parser');
const Interpreter = require('./interpreter');

const inputCode = `
HelloWorld;
cat;
repeater;
reverse;
multiply;
`;

const lexer = new Lexer(inputCode);
const tokens = lexer.tokenize();

const parser = new Parser(tokens);
const ast = parser.parse();

const interpreter = new Interpreter();
const result = interpreter.interpret(ast);

console.log(result); 