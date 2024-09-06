const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const adminSchema = mongoose.Schema({
    username: {
        required: [true, 'Admin Username cannot be blank'],
        type: String,
        unique: true
    },
    password: {
        required: [true, 'Admin password cannot be blank'],
        type: String,
        unique: true,
        minlength: 8
    },
})


adminSchema.pre("save", async function (next) {
//   "password": "admin@12345678"
    console.log('isnew ', this.isNew);
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
})




// Create a model
// rgschooldb  - this is db name defined in conn string.
// when first query fires it will create in mongo.
// admins -> collection name as defined below
const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;