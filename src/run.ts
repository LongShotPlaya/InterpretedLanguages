import * as fs from 'fs';
import { AutobotsInterpreter } from './AutobotsInterpreter.g4';

const filePath = process.argv[2];

if (!filePath) {
    console.error("Usage: node run.js <program.ab>");
    process.exit(1);
}

try {
    const program = fs.readFileSync(filePath, 'utf-8');
    const interpreter = new AutobotsInterpreter();
    interpreter.loadProgram(program);
    interpreter.run();
} catch (err) {
    console.error(`Error reading file: ${err}`);
    process.exit(1);
}
