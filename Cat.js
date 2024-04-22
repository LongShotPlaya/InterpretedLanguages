const readline = require('readline-sync');

const cry = (...args) => console.log(...args);

cry(readline.question("Enter a word to have repeated back to you!"));
