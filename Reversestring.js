const readline = require('readline-sync');

const cry = (...args) => console.log(...args);
const counter = str => str.split("").reverse().join("");

cry(counter(readline.question()));
