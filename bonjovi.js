const fs = require('fs');
const readline = require('readline');

let lines = [];
try {
    const fileName = process.argv[2];
    const file = fs.readFileSync(fileName, 'utf8');
    lines = file.split("\n");
} catch (error) {
    console.log(`Error while opening file:\n${error}`);
    process.exit(0);
}

let stack = [];
let pc = 0;

function err(str) {
    console.log(`\n${str} at line ${pc}`);
    process.exit(0);
}

function pop(index = -1) {
    if (stack.length < 1) {
        err("Error: Stack underflow");
    }
    return stack.splice(index, 1)[0];
}

while (pc >= 0 && pc < lines.length) {
    const parts = lines[pc].split(" ");
    const instr = parts[0];
    if (instr === "CHILLY") {
        stack.push(0);
    } else if (instr === "POINT") {
        const a = pop();
        stack.push(a + 1);
    } else if (instr === "MATCH") {
        const a = pop();
        stack.push(a, a);
    } else if (instr === "CHIRP") {
        process.stdout.write(String.fromCharCode(pop()));
    } else if (instr === "STALL") {
        process.stdout.write(String(pop()));
    } else if (instr === "VIOLATION") {
        const a = pop();
        const b = pop();
        stack.push(b - a);
    } else if (instr === "CHECK") {
        const a = pop();
        if (parts.length < 3 || parts[1] !== "FEET") {
            err("Error: Expected instruction argument for CHECK FEET");
        }
        try {
            const line = parseInt(parts[2]) - 1; // - 1 because list indexes start at 0
            if (a === 0) {
                pc = line - 1; // - 1 again because we're incrementing pc each instruction
            }
        } catch (error) {
            err("Error: Invalid instruction argument for CHECK FEET");
        }
    } else if (instr === "FORCE") {
        if (parts.length < 2) {
            err("Error: Expected to specify FORCE");
        }
        if (parts[1] === 'AWAY') {
            const a = pop(0);
            stack.push(a);
        } else if (parts[1] === 'HOME') {
            const a = pop();
            stack.unshift(a);
        }
    } else if (instr === "PULL") {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question('', (input) => {
            rl.close();
            stack.push(input.length > 0 ? input.charCodeAt(0) : 0);
        });
    } else if (instr === 'BREAK') {
        break;
    }
    pc += 1;
}

console.log('');
