const express = require('express');
const mongoose = require('mongoose');
const app = express();
const router = express.Router();
const { schema } = require('./students');
const Student = require('./students');

mongoose.connect('mongodb+srv://apiuser:abcd1234@cluster0.3dagi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use('/utem/api', router);
//HTTP test
app.get('/', (req, res) => res.send('Hello World!'));

//add student - 3(a)
router.post('/students', (req, res) => {
    let newStudent = new Student({
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        matrix: req.body.matrix,
        cgpa: req.body.cgpa,
    });

    //method save by mongoose to store newRestaurant model data in db
    newStudent.save((err) => {
        if (err) {
            res.json({ error: 'message' + err });
        } else {
            res.json({ message: 'Student succesfully registered!' });
        }
    });
});

//add courses - 3(b)
router.post('/students/:matrix/courses', (req, res) => {
    const matrix = req.params.matrix;
    Student.findByIdAndUpdate({_id: matrix}, {$push: req.body }, (err, restaurant) => {
        if (err) res.json({ error: 'message' + err });
        res.json({ message: 'Course succesfully added!' });
    });
});

/* 
localhost:8080/utem/api/students/611fa814e68d625d5ec7c0fd/courses - POST
{
    "courses": [
        {
            "name": "Mobile Backend",
            "code": "MSMD5163",
            "mark": 82
        }
    ]
}
*/


//Fetch students by id, 'student' - 3(c)
router.get("/students/:matrix", (req, res) => {
  const matrix = req.params.matrix;
  Student.find({"matrix": matrix}, (err, students) => {
    if (err) {
      res.json({ error: "Getting error!" + err });
    } else {
      res.json({
        message: "Fetching student info for matrix: " + matrix,
        Students: students,
      });
    }
  });
});
/* 
localhost:8080/utem/api/students/M203456789 - POST
*/


//Retrieve students {name, matrix, CGPA} by CGPA $gt: 3.0, '/studentCGPA' - 3(d)


//Retrieve courses by matrix, '/students/:matrix/courses' - 3(e)
router.get("/students/:matrix/courses", (req, res) => {
  const matrix = req.params.matrix;
  Student.find({ matrix: matrix }, "courses", (err, students) => {
    if (err) {
      res.json({ error: "Getting error!" + err });
    } else {
      res.json(students);
    }
  });
});
/* 
localhost:8081/utem/api/students/M203456789/courses
*/
//Retrieve student {name, matrix} by mark $gte: 80 '/studentMarks/:course_id' - 3(f)
router.get("/studentMarks/:course_id", (req, res) => {
    const course_id = req.params.course_id;
    Student.find({ "courses": { "course._id": course_id, "mark": $gte = 80 } }, {
        "name": 1 }, (err, students) => {
      if (err) {
        res.json({ error: "Getting error!" + err });
      } else {
        res.json({
          message: "Retrieving student marks for courses: " + course_id, students:students
        });
      }
    });
});
/* 
localhost:8080/utem/api/studentMarks/611fb85e4a80176a1e5a1817
*/


//Update student {name, address, phone, email, matrix or CGPA} by matrix '/students/:matrix' - 3(g)
router.put('/students/:matrix', (req, res) => {
    const matrix = req.params.matrix;
    let cgpa = req.body; //data from json

    Student.findOneAndUpdate(
      { "matrix": matrix },
      { $set: cgpa },
      (err, students) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Student record succesfully updated!" });
        }
      }
    );
});
/* 
localhost:8080/utem/api/students/M203456789 - PUT
{
    "cgpa": 4
}
*/


//Update course by matrix & course_id, '/students/:matrix/courses/:course_id' - 3(h)
router.put('/students/:matrix/courses/:course_id', (req, res) => {
    const matrix = req.params.matrix;
    const course_id = req.params.course_id;
    let courses = req.body; //data from json

    Student.findOneAndUpdate(
      { "matrix": matrix, "courses._id":course_id },
      { $set: {"courses.$":courses} },
      (err, students) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Course for student matrix: "+ matrix +" succesfully updated!" });
        }
      }
    );
});
/* 
localhost:8080/utem/api/students/M203456789/courses/611faae8c765265fa9e721a7 - PUT
{
    "name": "iOS",
    "code": "MSMD5233",
    "mark": 90
}
*/


//Delete student by matrix, '/student/:matrix' - 3(i)
router.delete('/students/:matrix', (req, res) => {
    const matrix = req.params.matrix; //document id
  
    Student.findOneAndRemove(
      { "matrix": matrix },
      (err, students) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Student succesfully removed!" });
        }
      }
    );
});
/* 
localhost:8080/utem/api/students/M032020012 - DELETE
*/


//Delete course by matrix & course_id, '/students/:matrix/courses/:course_id' - 3(j)
router.delete('/students/:matrix/courses/:course_id', (req, res) => {
    const matrix = req.params.matrix; //document id
    const course_id = req.params.course_id; //subdocument id
  
    Student.findOneAndUpdate(
      { "matrix": matrix },
      { $pull: { "courses": {_id: course_id} } },
      (err, students) => {
        if (err) {
          res.json({ error: "message" + err });
        } else {
          res.json({ message: "Course succesfully deleted!" });
        }
      }
    );
});
/* 
localhost:8080/utem/api/students/M032020012/courses/611fb28d32f24b658ec03412 - DELETE
*/

const port = 8081;
app.listen(port, () => console.log(`The server is started and listening on port `+port+'. Click Ctrl+Z to terminate the program..'));