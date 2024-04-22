const Interpreter = require('./interpreter');

describe('Interpreter', () => {
    test('Interpret input code', () => {
        const interpreter = new Interpreter();
        const ast = [
            { type: 'FUNCTION_CALL', name: 'cat', arguments: ['"Hello"'] },
            { type: 'FUNCTION_CALL', name: 'multiply', arguments: ['2', '4'] },
        ];
        const result = interpreter.interpret(ast);
        expect(result).toEqual(['Hello', 8]);
    });
});

module.exports = Interpreter;
