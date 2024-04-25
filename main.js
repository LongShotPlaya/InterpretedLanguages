//#region Lexer
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let dreams = [];
let memories = 0;
//#endregion

//#region heartache
const heartache = (str) => {
    console.log(`\n${str} at line ${memories}`);
    process.exit(0);
};
//#endregion

//#region wanted
const wanted = (index = -1) => {
    if (dreams.length < 1) {
        heartache("Heartbreak: Stack underflow");
    } else {
        return dreams.splice(index, 1)[0];
    }
};
//#endregion

//#region takeMeBack
const takeMeBack = (message) => {
    const brokenMessage = message.split('').reverse();
    for (const char of brokenMessage) {
        dreams.push(char.charCodeAt(0));
    }
    if (message.length === 0) {
        dreams.push(32);
    }
};
//#endregion

//#region singAlong
const singAlong = () => {
    const reversedDreams = dreams.slice().reverse(); 
    const dreamString = reversedDreams.map((charCode) => String.fromCharCode(charCode)).join("");
    const words = dreamString.split(/\s+/).reverse().join(" ");
    console.log(words);
};
//#endregion

//#region rockTheWorld
const rockTheWorld = () => {
    return new Promise((resolve, reject) => {
        rl.question('Livin\' on a prayer: ', (input) => {
            for (const char of input) {
                const charCode = char.charCodeAt(0);
                dreams.push(charCode);
            }
            singAlong();
            resolve();
        });
    });
};
//#endregion

//#region Parser
const badMedicine = async () => {
    return new Promise((resolve, reject) => {
        rl.question('Take me back to your heart: ', (input) => {
            const words = input.split(' ').reverse().join(' ');
            const reversedInput = words.split('').reverse().join('');
            for (const char of reversedInput) {
                const charCode = char.charCodeAt(0);
                dreams.push(charCode);
            }
            resolve();
        });
    });
};
//#endregion

//#region handling déjà vu
const runaway = async () => {
    if (dreams.length < 2) { 
        heartache("Heartbreak: Insufficient elements in stack for RUNAWAY command");
        return;
    }
    const repeatCount = wanted(); 
    const repeatChar = String.fromCharCode(wanted()); 
    if (repeatCount === 0) {
        return; 
    }
    if (isNaN(repeatCount) || repeatCount < 0) {
        heartache("Heartbreak: Invalid repeat count");
        return;
    }
    const repeatedString = repeatChar.repeat(repeatCount);
    for (const char of repeatedString) {
        dreams.push(char.charCodeAt(0));
    }
};
//#endregion

//#region ASK
const livingOnTheEdge = async () => {
    return new Promise((resolve, reject) => {
        rl.question('Blaze of glory, give me a sign: ', (input) => {
            if (input.length !== 1) {
                console.log("Heartbreak: You must enter a single character.");
                rl.close();
                reject();
            } else {
                const charCode = input.charCodeAt(0);
                dreams.push(charCode);
                rl.question('Ride cowboy, ride, enter repeat count: ', (count) => {
                    if (!isNaN(count) && count >= 0) {
                        dreams.push(parseInt(count));
                        resolve();
                    } else {
                        console.log("Heartbreak: Invalid repeat count.");
                        rl.close();
                        reject();
                    }
                });
            }
        });
    });
};
//#endregion

//#region Interpreter
const liveWire = async () => {
    const fileName = process.argv[2];
    try {
        const lines = fs.readFileSync(fileName, 'utf8').split('\r\n');
        while (memories >= 0 && memories < lines.length) {
            const parts = lines[memories].split(" ");
            const instr = parts[0];
            memories += 1;

            switch (instr) {
                case "STAND_UP":
                    dreams.push(0);
                    break;
                case "WANTED":
                    if (dreams.length > 0) {
                        const value = dreams[dreams.length - 1];
                        dreams.push(value);
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;
                case "BED_OF_ROSES":
                    if (dreams.length > 0) {
                        const value = wanted();
                        dreams.push(value + 1);
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;
                case "LIVIN_ON_A_PRAYER":
                    await rockTheWorld();
                    break;
                case "TAKE_ME_BACK":
                    takeMeBack(parts.slice(1).join(' '));
                    break;                
                case "RUNAWAY":
                    runaway();
                    break;
                case "LAY_YOUR_HANDS":
                    if (dreams.length > 0) {
                        console.log(String.fromCharCode(wanted()));
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;
                case "IN_THESE_ARMS":
                    if (dreams.length > 0) {
                        console.log("Answer: " +wanted());
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;
                case "DEAD_OR_ALIVE":
                    if (dreams.length > 0) {
                        const n = wanted();
                        if (n === 0) {
                            memories = parseInt(parts[1]) - 1;
                        }
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;
                case "NEVER_SAY_GOODBYE":
                    if (dreams.length > 0) {
                        const value = dreams.pop();
                        dreams.unshift(value);
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;
                case "HAVE_A_NICE_DAY":
                    if (dreams.length > 0) {
                        const value = dreams.shift();
                        dreams.push(value);
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;
                case "WHEN_WE_WERE_BEAUTIFUL":
                    singAlong();
                    break;
                case "WANTED_DEAD_OR_ALIVE":
                    runaway();
                    break;
                case "YOU_GIVE_LOVE_A_BAD_NAME":
                    console.log("Enter the first number: ");
                    await new Promise((resolve, reject) => {
                        rl.question('', async (input1) => {
                            const num1 = parseInt(input1);
                            if (!isNaN(num1)) {
                                console.log("Enter the second number: ");
                                rl.question('', async (input2) => {
                                    const num2 = parseInt(input2);
                                    if (!isNaN(num2)) {
                                        dreams.push(num1);
                                        dreams.push(num2);
                                        resolve();
                                    } else {
                                        console.log("Heartbreak: Invalid input.");
                                        rl.close();
                                        process.exit(0);
                                    }
                                });
                            } else {
                                console.log("Heartbreak: Invalid input.");
                                rl.close();
                                process.exit(0);
                            }
                        });
                    });
                    break;

                case "DEAD_ON_YOUR_FEET":
                    if (dreams.length > 1) {
                        const a = wanted();
                        const b = wanted();
                        dreams.push(b * a);
                    } else {
                        heartache("Heartbreak: Stack underflow");
                    }
                    break;

                case "BLAZE_OF_GLORY":
                    await livingOnTheEdge();
                    break;
                case "TAKE_ME_HOME":
                    await badMedicine();
                    break;
                case "BORN_TO_BE_MY_BABY":
                    process.exit(0);
                    break;
                default:
                    console.log("Shot through the heart, and youre to blame!... Invalid input, do better: ", instr, "\n");
                    process.exit(1);
            }
        }
    } catch (error) {
        console.log("Error while opening file:\n", error);
        process.exit(0);
    }
};
//#endregion

liveWire();
