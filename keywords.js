// classes/keywords.js

function cry(...args) {
    console.log(...args);
}

function kind(lit) {
    return typeof lit;
}

function tellme(prompt = "") {
    return prompt; // Simulating input
}

function counter(str) {
    return str.split("").reverse().join("");
}

function again(str, count) {
    return str.repeat(count);
}

const keywords = {
    cry,
    kind,
    tellme,
    counter,
    again,
};

module.exports = keywords;
