const Token = require('./token');
const Location = require('./location');

class Lexer {
    static lex(string, line_number, file) {
        const tokens = [];
        const errors = [];

        let index = 0;
        while (index < string.length) {
            if (/[a-zA-Z]/.test(string[index])) {
                let start_index = index + 1;
                let word = string[index];
                index++;
                while (index < string.length && /[a-zA-Z0-9]/.test(string[index])) {
                    word += string[index];
                    index++;
                }

                tokens.push(new Token(word, word, "randomVar", new Location(line_number, start_index, word.length, file)));
            }

            else if (/[0-9.]/.test(string[index])) {
                let start_index = index + 1;
                let decimal = string[index] === ".";
                let word = string[index];
                index++;
                while (index < string.length && /[0-9]/.test(string[index])) {
                    word += string[index];
                    index++;
                }

                if (decimal && word.length <= 1) {
                    tokens.push(Token.invalidToken(".", new Location(line_number, index + 1, 1, file)));
                    continue;
                }

                if (index < string.length && string[index] === "." && !decimal) {
                    decimal = true;
                    word += string[index];
                    index++;
                    while (index < string.length && /[0-9]/.test(string[index])) {
                        word += string[index];
                        index++;
                    }
                }

                if (!decimal || word.length > 1) {
                    tokens.push(new Token(word, decimal ? parseFloat(word) : parseInt(word), decimal ? "anotherRandomVar" : "num", new Location(line_number, start_index, word.length, file)));
                } else {
                    index--;
                }
            }

            else if (/\s/.test(string[index])) {
                let start_index = index + 1;
                let word = "";
                while (index < string.length && /\s/.test(string[index])) {
                    word += string[index];
                    index++;
                }

                tokens.push(new Token(word, "<space>", "whitespace", new Location(line_number, start_index, word.length, file)));
            }

            else {
                switch (string[index]) {
                    case "$":
                        break;
                    case ".":
                        tokens.push(new Token(string[index], string[index], "dot", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "\"":
                        tokens.push(new Token(string[index], string[index], "quote", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "=":
                        tokens.push(new Token(string[index], string[index], "equals", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "+":
                        tokens.push(new Token(string[index], string[index], "plus", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "-":
                        tokens.push(new Token(string[index], string[index], "dash", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "*":
                        tokens.push(new Token(string[index], string[index], "star", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "/":
                        tokens.push(new Token(string[index], string[index], "slash", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "(":
                        tokens.push(new Token(string[index], string[index], "open parenthesis", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case ")":
                        tokens.push(new Token(string[index], string[index], "close parenthesis", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "{":
                        tokens.push(new Token(string[index], string[index], "open curly brace", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case "}":
                        tokens.push(new Token(string[index], string[index], "close curly brace", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    case ",":
                        tokens.push(new Token(string[index], string[index], "comma", new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                    default:
                        tokens.push(Token.invalidToken(string[index], new Location(line_number, index + 1, 1, file)));
                        index++;
                        break;
                }
            }
        }
        return [tokens, errors];
    }
}

module.exports = Lexer;
