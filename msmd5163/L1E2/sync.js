var fs = require("fs");

var data = fs.readFileSync("input.txt");

console.log('Begin reading');
console.log(data.toString());
console.log("End reading..");