const StudentModel = require("../models/students-model");

// Handler or param middleware.
exports.checkRollNo = (req, res, next, value) => {
    console.log('PARAM MIDDLEWAYE11 ', value);
    // if (parseInt(value) < 0) {
    //     return res.status(301).send('ROLL NUMBER SHOULD BE ALWAYS POSITIVE NUMBER')
    // }
    next()
}

exports.getAllStudents = async(req, res, next) => {
   try {
    const students = await StudentModel.find();
    res.status(200).json({
        status: 'success',
        total: students.length,
        data: {
            students
        }
    })
   } catch (error) {
    res.status(404).json({
        status: 'fail',
        data: {
            message: error.message
        }
    })
   }
}
exports.getByRollNo = async(req, res, next) => {
  try {
    const student = await StudentModel.findById(req.params.id);
    res.status(200).json({
        status: 'success',
        data: {
            student
        }
    })
  } catch (error) {
    res.status(404).json({
        status: 'fail',
        data: {
            message: error.message
        }
    })
  }
}
exports.createStudent = async (req, res, next) => {
    try {
        const newStudent = new StudentModel(req.body);
        const savedStudent = await newStudent.save();
        res.status(201).json({
            status: 'success',
            data: {
                savedStudent
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            data: {
                message: error.message
            }
        })
    }
}

exports.patchStudent = (req, res, next) => {
    const { rollno } = req.params;
    const reqobj = req.body
    res.json({
        status: 200,
        data: {
            msg: 'patch',
            rollno: rollno,
            payload: reqobj
        }
    })
}

exports.deletStudent = (req, res, next) => {
    const { rollno } = req.params;
    const reqobj = req.body
    res.json({
        status: 200,
        data: {
            msg: 'Delete new',
            rollno: rollno,
            payload: reqobj
        }
    })
}

exports.validateCreateStudent = (req, res, next) => {
    const reqobj = req.body;
    if (!reqobj.rollno || !reqobj.name) {
        return res.json({
            status: 400,
            data: {
                msg: 'ROll NO or Name is REQUIRED',
            }
        })
    }
    next();

}

exports.addRollNumberCtrl = async (req, res, next) => {
    if (!req.body.studentInfo) {
        return res.json({
            status: 400,
            data: {
                msg: 'Student Info is REQUIRED',
            }
        })
    }
    try {
        const { standard, div, batch } = req.body.studentInfo;
        const fountStudent = await StudentModel.find({
            'studentInfo.standard': standard,
            'studentInfo.div': div,
            'studentInfo.batch': batch,
        }).countDocuments()
        const rollno = `${fountStudent + 1}-${standard}-${div}-${batch}`;
        req.body.registrationnumber = rollno;
        next();
    } catch (error) {
        res.json({
            status: 400,
            data: {
                message: error.message,
            }
        })
        next()
    }
}

exports.verifyEmailStudent = async(req, res, next) => {
  
    res.json({
        status: 200,
        data: {
            message: "OTP sent to "+req.body.email
        }
    })
}
