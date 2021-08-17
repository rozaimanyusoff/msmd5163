var fs = require("fs");

console.log("\nFile Contents of file before append:",
  fs.readFileSync("input.txt", "utf8"));

var data = "\nNew sentence was added using syncAppend.js.";
 
// append data to file
fs.appendFileSync('input.txt',data, 'utf8');
console.log("Data is appended to file successfully.");