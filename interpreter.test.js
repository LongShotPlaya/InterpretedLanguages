// interpreter.test.js

const { Lexer } = require('./lexer'); // Import Lexer from lexer.js
const Interpreter = require('./interpreter');

describe('Interpreter', () => {
    test('Interpret HelloWorld', () => {
        const interpreter = new Interpreter();
        const ast = { type: 'FunctionCall', name: 'HelloWorld' };
        const result = interpreter.interpret(ast);
        expect(result).toBe('Hello, World!');
    });

    // Add more tests for other functions
});

module.exports = { Interpreter };