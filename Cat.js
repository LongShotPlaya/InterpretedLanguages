const readline = require('readline-sync');

const Funky = (...args) => console.log(...args);

Funky(readline.question("Enter a word to have repeated back to you!"));
