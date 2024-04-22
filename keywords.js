function Funky(...args) {
    console.log(...args);
}

function kind(lit) {
    return typeof lit;
}

function tellme(prompt = "") {
    return prompt;
}

function counter(str) {
    return str.split("").reverse().join("");
}

function echo(str, count) {
    return str.repeat(count);
}

const keywords = {
    Funky,
    kind,
    tellme,
    counter,
    echo,
};

module.exports = keywords;
