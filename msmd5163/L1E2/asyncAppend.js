var fs = require('fs');

console.log("\nFile Contents of file before append:",
  fs.readFileSync("input.txt", "utf8"));
    
  var data = "\nThis sentence was added using asynAppend.js";
 
  // append data to file
  fs.appendFile('input.txt',data, 'utf8',
      // callback function
      function(err) {     
          if (err) throw err;
          // if no error
          console.log("Data is appended to file successfully.");
  });