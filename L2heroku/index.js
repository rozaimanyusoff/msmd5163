//import and setting up middleware
var express = require('express'); //call express

//define our app using express
var app = express(); 

// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set our port //Setting route and path
var port = process.env.PORT || 8080; 

// Routing
var router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Hula! my API works!!!' });
}); /*get method to handle GET request. ‘/’ is the requested endpoint. It’s the value that comes after your domain name.*/

//1(a) Return routing with "Hello World" message in body
router.get('/hello', (req, res) => {
    res.json({ message: 'Hello World!' });
});


//1(b) Return routing with "Goodbye" + name as parameters
router.get('/goodbye/:name', (req, res) => {
    res.json({ message: 'Goodbye ' + req.params.name });
});


//1(c) Return sum of 2 numbers in body by POST method
router.post('/sum', (req, res) => {
    var sum = req.body.num1 + req.body.num2;
    res.json({ message: 'Total is ' + sum });
});


app.use('/api', router);
app.listen(port); // create a server that browsers can connect to 
console.log("Magic happened at port " + port);