const express = require("express");
const {getAllStudents, getByRollNo, createStudent, 
    patchStudent, deletStudent, checkRollNo,
    addRollNumberCtrl, verifyEmailStudent } = require("../controllers/student-ctrl");




const router = express.Router()
// app.get("/api/v1/students", getAllStudents)
// { rollno: '10', name: 'rahul', city: 'nagar' }
// { rollno: '10', name: 'rahul', city: undefined } - in case city is optionl
// app.get("/api/v1/students/:rollno/:name/:city?", getByRollNo)
// app.post("/api/v1/students", createStudent)
// app.patch("/api/v1/students/:rollno", patchStudent)
// app.delete("/api/v1/students/:rollno", deletStudent)

// Param middleware-if roll no is url then this middleware calls
router.param("rollno", checkRollNo)


router.route("/")
.get(getAllStudents)
.post(addRollNumberCtrl, createStudent);

router.route("/:id")
.get(getByRollNo)
.patch(patchStudent)
.delete(deletStudent)


router.route("/verify-email")
.post(verifyEmailStudent);
// router.route("/:rollno/:name/:city?")
// .get(getByRollNo)

module.exports = router;