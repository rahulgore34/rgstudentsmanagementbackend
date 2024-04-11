const mongoose =  require("mongoose");

const studentSchema = new mongoose.Schema({
    personalInfo: {
      firstName: {
        required: [true, 'FirsName cannot be blank'],
        type: String
      },
      middleName: String,
      lastName: {
        required: [true, 'LastName cannot be blank'],
        type: String
      },
      motherName: String,
      gender: {
        required: [true, 'Gender cannot be blank'],
        type: String
      },
    },
    address: {
      street: String,
      city: String,
      state: {
        type: String,
        required: [true, 'State cannot be blank'],
      },
      pincode: {
        type: Number,
        required: [true, 'Pincode cannot be blank'],
      },
    },
    communication: {
      email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      phone: {
        type: String,
        required: true,
        unique: true,
        validate: {
          validator: function(v) {
            return /\d{10}/.test(v); // Check if the phone number has at least 10 digits
          },
          message: props => `${props.value} is not a valid phone number!`,
        },
      },
    },
    studentInfo: {
      standard: String,
      div: String,
      batch: Number,
    },
    registrationnumber: String,
    isemailerified: {
      type: Boolean,
      default: false
    }
  });
  
  const StudentModel = mongoose.model('Student', studentSchema);
  
  module.exports = StudentModel;