const mongoose = require('mongoose');

const orgSchema = mongoose.Schema({
    email: {
        required: [true, 'Admin email cannot be blank'],
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        type: String,
        unique: true
    },
    otp: {
        type: String,
    },
    isemailerified: {
        type: Boolean,
        default: false
    },
    otpSentAt: { type: Date }
})







// Create a model
// rgschooldb  - this is db name defined in conn string.
// when first query fires it will create in mongo.
// admins -> collection name as defined below
const OrgMeModel = mongoose.model('organizemeusers', orgSchema);

module.exports = OrgMeModel;