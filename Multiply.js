const readline = require('readline-sync');

const cry = (...args) => console.log(...args);
const by = (num1, num2) => num1 * num2;

cry("Welcome to the multiplier!");
cry("Your answer is:", by(parseFloat(readline.question("Input the first term!")), parseFloat(readline.question("Input the second term!"))));
