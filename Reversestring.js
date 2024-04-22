const readline = require('readline-sync');

const Funky = (...args) => console.log(...args);
const counter = str => str.split("").reverse().join("");

Funky(counter(readline.question()));
