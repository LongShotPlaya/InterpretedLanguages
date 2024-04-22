// classes/location.js

class Location {
    constructor(line_number, column, length, file_name) {
        this.line_number = line_number;
        this.column = column;
        this.length = length;
        this.file_name = file_name;
    }

    toString() {
        return `(${this.file_name}, ${this.line_number}:${this.column}:${this.length})`;
    }
}

module.exports = Location;
