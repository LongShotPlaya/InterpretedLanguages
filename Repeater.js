const readline = require('readline-sync');

const Funky = (...args) => console.log(...args);
const again = (str, count) => str.repeat(count);

Funky(again("HA  ", 10));
