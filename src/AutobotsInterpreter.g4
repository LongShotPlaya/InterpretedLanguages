import * as antlr4 from 'antlr4';
import { AutobotsLexer } from './AutobotsLexer.g4';
import { AutobotsParser, AutobotContext } from './AutobotsParser';

class AutobotsInterpreter {
    stack: any[];
    pc: number;
    lines: string[];

    constructor() {
        this.stack = [];
        this.pc = 0;
        this.lines = [];
    }

    loadProgram(program: string): void {
        this.lines = program.split("\n");
    }

    err(message: string): void {
        console.log(`\n${message} at line ${this.pc}`);
        process.exit(0);
    }

    pop(index = -1): any {
        if (this.stack.length < 1) {
            this.err("Error: Stack underflow");
        }
        return this.stack.splice(index, 1)[0];
    }

    execute(instruction: AutobotContext): void {
        const name = instruction.name().getText();
        switch (name) {
            case "OptimusPrime":
                this.OptimusPrime();
                break;
            case "Bumblebee":
                this.Bumblebee();
                break;
            case "Megatron":
                this.Megatron();
                break;
            case "Starscream":
                this.Starscream();
                break;
            case "Soundwave":
                this.Soundwave();
                break;
            default:
                this.err(`Error: Unknown Autobot ${name}`);
                break;
        }
    }

    OptimusPrime(): void {
        console.log("Hello, Autobots!");
    }

    Bumblebee(): void {
        const str1 = this.pop();
        const str2 = this.pop();
        this.stack.push(str2 + str1);
    }

    Megatron(): void {
        const num1 = Number(this.pop());
        const num2 = Number(this.pop());
        this.stack.push(num1 * num2);
    }

    Starscream(): void {
        const str = this.pop();
        const times = Number(this.pop());
        this.stack.push(str.repeat(times));
    }

    Soundwave(): void {
        const str = this.pop();
        this.stack.push(str.split("").reverse().join(""));
    }

    run(): void {
        while (this.pc >= 0 && this.pc < this.lines.length) {
            const line = this.lines[this.pc];
            const instruction = new AutobotsParser(new antlr4.CommonTokenStream(new AutobotsLexer(new antlr4.InputStream(line)))).autobot();
            this.execute(instruction);
            this.pc++;
        }
    }
}

// Example usage:
const interpreter = new AutobotsInterpreter();
interpreter.loadProgram("Your Autobots program here");
interpreter.run();
console.log(interpreter.stack);
