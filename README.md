# Interpreted Language

This project implements an interpreted programming language in JavaScript. The language supports basic arithmetic expressions, variables, input/output operations, and control structures.

## Features

- Arithmetic expressions evaluation
- Variable declaration and assignment
- Input/output operations
- Control structures (if statements)

To run the interpreter and execute programs written in the interpreted language, follow these steps:

1. **Write Programs**: Write programs in the interpreted language and save them with a `.txt` extension. Example programs are provided in the `examples` directory.

2. **Run Interpreter**: Execute the interpreter with the path to the program file as an argument:

## Example Programs

The `examples` directory contains example programs written in the interpreted language:

- `helloworld.txt`: Prints "Hello, world!" to the console.
- `cat.txt`: Reads user input and prints it.
- `multiply.txt`: Multiplies two numbers entered by the user.
- `repeater.txt`: Repeats a specific character a certain number of times.
- `reversestring.txt`: Reverses a string entered by the user.

## Testing

To test the interpreter, you can run the provided example programs and verify the output. Additionally, you can write your own programs to test various language features and edge cases.

## Project Structure

The project structure is organized as follows:

- `interpreter.js`: Main entry point for the interpreter.
- `Lexer.js`: Tokenizes input text.
- `Parser.js`: Parses tokens into an abstract syntax tree (AST).
- `Interpreter.js`: Evaluates the AST and executes the program.
- `Token.js`: Defines the Token class.
- `README.md`: Documentation explaining how to use the interpreter and run/test programs.

## Author

- Jacob Nixon
