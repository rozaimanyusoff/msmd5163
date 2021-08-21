//import and setting up middleware
var express = require('express'); //call express
var app = express(); //define our app using express
const mongoose = require('mongoose');
const Restaurant = require('./restaurant');
var router = express.Router();


//connect to mongoDB
mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

// Middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());


//Setting route and path
app.use('/api', router);

router.get('/', (req, res) => {
    res.json({ message: 'Hula! my API works!!!' })
});


//add new document
router.post('/restaurants', (req, res) => {
    let newRestaurant = new Restaurant({
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        opening_time: req.body.opening_time,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        types: req.body.types
    });

    //method save by mongoose to store newRestaurant model data in db
    newRestaurant.save((err) => {
        if (err) {
            res.json({ error: 'message' + err })
        } else {
            res.json({ message: 'Restaurant succesfully created!' });
        }
        
    });
});
/* {
    "types": [
        "Local taste"
    ],
    "name": "Restoran Mee Bandung",
    "address": "Muar, Johor",
    "email": "bandungtomuar@gmail.com",
    "phone": "06-3333234",
    "description": "Bandung's taste",
    "opening_time": "10:00 AM",
    "latitude": 2.324566,
    "longitude": 121.2342345,
    "reviews": [],
    "menus": []
} */

//add menu into target document
router.post('/restaurants/:id/menus', (req, res) => {
    const id = req.params.id;
    Restaurant.findByIdAndUpdate(id, {$push: req.body }, (err, restaurant) => {
        if (err) res.json({ error: 'message' + err });
        res.json({ message: 'Menu succesfully added!' });
    });
});
/* 
localhost:8082/api/restaurants/<OBJECT ID>/menus
{
    "menus": [
        {
            "name": "Tomyam Pizza",
            "description": "Thai's flavoured pizza",
            "price": 105,
            "imageUrl": "https://pizzahutyee.net/tomyampizza.html"
        },
        {
            "name": "Amerikana Brokoli's Pizza",
            "description": "The great vegetarian pizza",
            "price": 55,
            "imageUrl": "https://pizzahutyee.net/brokolipizza.html"
        }
    ]
} */

//Add reviews into target document
router.post("/restaurants/:id/reviews", (req, res) => {
    const id = req.params.id;
    let reviews = req.body;
  Restaurant.findByIdAndUpdate(id, { "$push": reviews }, (err, restaurant) => {
    if (err) res.json({ error: "message" + err });
    res.json({ message: "Review succesfully added!" });
  });
});
/* 
localhost:8082/api/restaurants/<OBJECT ID>/reviews
{
    "reviews":
    [
        {"username": "Mike Typeson",
        "rating": 4,
        "review": "Awesome!"
        },
        {"username": "Suthophone Mengkrap",
        "rating": 3,
        "review": "Sawadeekapp...hait!"
        },
        {"username": "Donalds Mcdonals",
        "rating": 2,
        "review": "Acceptable taste.."
        }
    ]
} */



//update subdocuments by id - Menus
router.put('/restaurants/:id/menus/:menus_id', (req, res) => {
    const id = req.params.id; //document id
    const menus_id = req.params.menus_id; //subdocument id
    let menus = req.body; //data from json

    Restaurant.findOneAndUpdate(
      { _id: id, "menus._id": menus_id },
      { $set: { "menus.$": menus } },
      (err, restaurant) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Menu succesfully updated!" });
        }
      }
    );
});

/* 
localhost:8082/api/restaurants/611e1c7b6057114aa7c3c580/menus/611e6cfa9f3aeb7d413b0e37
{
    "name": "Tomyam Pizza A+",
    "description": "Thai's flavoured pizza made from popular Bangkok's streets",
    "price": 125,
    "imageUrl": "https://pizzahutyee.net/tomyampizza.html"
} */


//update subdocuments by id - Reviews
router.put('/restaurants/:id/reviews/:review_id', (req, res) => {
    const id = req.params.id; //document id
    const review_id = req.params.review_id; //subdocument id
    let reviews = req.body; //data from json

    Restaurant.findOneAndUpdate(
      { _id: id, "reviews._id": review_id },
      { $set: { "reviews.$": reviews } },
      (err, restaurant) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Review succesfully updated!" });
        }
      }
    );
});

/* 
localhost:8082/api/restaurants/611e7f217d058e8cb292bad5/reviews/611e801f7d058e8cb292badd
{
    "username": "Donalds McDonalds",
    "rating": 2,
    "review": "Acceptable taste.."
} */


//delete subdocuments - Menus
router.delete("/restaurants/:id/menus/:menus_id", (req, res) => {
  const id = req.params.id; //document id
  const menus_id = req.params.menus_id; //subdocument id

  Restaurant.findOneAndUpdate(
    { _id: id },
    { $pull: { "menus": {_id: menus_id} } },
    (err, restaurant) => {
      if (err) {
        res.json({ error: "message" + err });
      } else {
        res.json({ message: "Menu succesfully deleted!" });
      }
    }
  );
});

/* 
localhost:8082/api/restaurants/611e8c93a6cb5595f7deb100/menus/611e8cdaa6cb5595f7deb10c
*/

//delete subdocuments - Reviews
router.delete('/restaurants/:id/reviews/:review_id', (req, res) => {
    const id = req.params.id; //document id
    const review_id = req.params.review_id; //subdocument id
  
    Restaurant.findOneAndUpdate(
      { _id: id },
      { $pull: { "reviews": {_id: review_id} } },
      (err, restaurant) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Review succesfully deleted!" });
        }
      }
    );
});

/* 
localhost:8082/api/restaurants/611e8c93a6cb5595f7deb100/reviews/611e8d11a6cb5595f7deb114
*/


//filter subdocument by id - Menus
router.get('/restaurants/:id/menus/:menus_id', (req, res) => {
  const id = req.params.id;
  Restaurant.findById({ _id: id }, (err, restaurant) => {
    //console.log(req.params.menus_id);
    if (err) {
      res.json({ error: "Getting error!" + err });
    } else {
      var menus = restaurant.menus.id(req.params.menus_id);
      res.json(menus);
    }
  });
});
/* 
localhost:8082/api/restaurants/6120b5768a6e97ebff646863/menus/6120d43dd64e1ffde3c3a3f1
{
    "_id": "6120d43dd64e1ffde3c3a3f1",
    "name": "Mee Maggi+",
    "description": "Malaysian favourite instant noodles",
    "price": 5,
    "imageUrl": "https://fastmee.com/maggiplus.php"
}
*/


//filter subdocuments by subdocument_id - Reviews
router.get('/restaurants/:id/reviews/:review_id', (req, res) => {
    const id = req.params.id;
    Restaurant.findById({_id: id}, (err, restaurant) => {
      if (err) {
        res.json({ error: "Getting error!" + err });
      } else {
        var reviews = restaurant.reviews.id(req.params.review_id);
        res.json(reviews);
      }
    });
});

/* 
localhost:8082/api/restaurants/611e8c93a6cb5595f7deb100/reviews/611e8cf3a6cb5595f7deb111

{
    "_id": "611e8cf3a6cb5595f7deb111",
    "username": "Suthophone Mengkrap",
    "rating": 3,
    "review": "Sawadeekapp...hait!"
}
*/




//filter documents by id - Menus
router.get("/restaurants/:id/menus", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id, "menus", (err, restaurant) => {
    if (err) {
      res.json({ error: "Getting error!" + err });
    } else {
      res.json(restaurant);
    }
  });
});
/* 
localhost:8082/api/restaurants/611e8c93a6cb5595f7deb100/menus
*/


//filter documents
router.get('/restaurants/:id/reviews', (req, res) => {
  const id = req.params.id;
    Restaurant.findById(id, "reviews", (err, restaurant) => {
        if(err) {
             res.json({ error: "Getting error!" + err });
        } else {
            res.json(restaurant);
        }
    });
});
/* 
localhost:8082/api/restaurants/611e8c93a6cb5595f7deb100/reviews
*/

//Filter document by id
router.get("/restaurants/:id", (req, res) => {
  const id = req.params.id;
  Restaurant.findById(id, (err, restaurant) => {
    if (err) {
      res.json({ error: "Getting error!" + err });
    } else {
      res.json({
        message: "Fetching restaurant info for id: " + id,
        restaurants: restaurant,
      });
    }
  });
});
/* 
localhost:8082/api/restaurants/611d30d84504fd64ccb07d3b
*/

//Fetch all documents
router.get('/restaurants', function(req, res, next) {
  Restaurant.find()
    .then(function (restaurant) {
        res.send(restaurant);
    })
    .catch(next);
});

/* 
localhost:8082/api/restaurants
*/

var port = process.env.PORT || 8082; //define HTTP port
app.listen(port); // create a server that browsers can connect to
console.log("Server started on port "+port+ ". Ctrl+Z to terminate the program..");