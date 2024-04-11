const mongoose = require('mongoose');

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

// Create a model
// rgschooldb  - this is db name defined in conn string.
// when first query fires it will create in mongo.
// admins -> collection name as defined below
const AdminModel = mongoose.model('Admin', adminSchema);

module.exports = AdminModel;