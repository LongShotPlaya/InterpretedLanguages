// classes/keywords.js

function Funky(...args) {
    console.log(...args);
}

function kind(lit) {
    return typeof lit;
}

function tellme(prompt = "") {
    return prompt; // SiFunkyating input
}

function counter(str) {
    return str.split("").reverse().join("");
}

function again(str, count) {
    return str.repeat(count);
}

const keywords = {
    Funky,
    kind,
    tellme,
    counter,
    again,
};

module.exports = keywords;
