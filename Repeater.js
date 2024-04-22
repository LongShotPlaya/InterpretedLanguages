const readline = require('readline-sync');

const cry = (...args) => console.log(...args);
const again = (str, count) => str.repeat(count);

cry(again("Boom", 5));
