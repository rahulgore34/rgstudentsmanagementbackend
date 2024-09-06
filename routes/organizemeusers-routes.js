const express = require("express");
const OrgMeModel = require("../models/organizeme-model");
const router = express.Router();

const otpGenerator = require('otp-generator')

router.route("/")
    .get(function (req, res) {
        res.send("BASIC")
    })


router.route("/organizemeuser")
    .post(addOrganizeMeUsers)
    .get(getallorgusers);

router.route("/orguserrequestotp")
    .post(sendOrgUserOTP);

router.route("/orguserverifyotp")
    .post(verifyOrgUserOTP);


module.exports = router;

// Controllers
async function addOrganizeMeUsers(req, res, next) {
    try {
        // const newAdmin = await AdminModel.create(req.body);
        const newuser = await OrgMeModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newuser
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

async function getallorgusers(req, res, next) {
    try {
        // const newAdmin = await AdminModel.create(req.body);
        const records = await OrgMeModel.find().select('-__v');;
        res.status(201).json({
            status: 'success',
            data: {
                orgusers: records
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}


// SEND OTP
async function sendOrgUserOTP(req, res, next) {
    //    write method to send email
    try {
        // Check if the email exists in the database
        const { email } = req.body;
        const user = await OrgMeModel.findOne({ email });

        if (!user) {
            res.json({
                status: 'F', message: "Email not exist"
            })
        }

        // Generate a new OTP
        const otp = getOTP();
        const otpSentAt = new Date();
        // Update the OTP field for the given email
        await OrgMeModel.updateOne({ email }, { otp, otpSentAt });

        // Here, you can integrate your email service to send the OTP to the user's email
        console.log(`OTP for ${email} is ${otp}`); // Just for debugging, remove in production
        res.json({
            status: 'P', message: "OTP sent successfully!!", otp: otp
        })
    } catch (error) {
        console.error('Error sending OTP:', error);
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}

// VERIFY OTP
async function verifyOrgUserOTP(req, res, next) {
    //    write method to send email
    try {
        const { email, otp } = req.body;
        // Find the user by email
        const user = await OrgMeModel.findOne({ email });
        if (!user) {
            return res.json({
                status: 'F', message: "Email not exist"
            })
        }
        // Check if the OTP is expired
        const currentTime = new Date();
        const otpAge = (currentTime - user.otpSentAt) / 1000; // Age in seconds
        if (otpAge > 120) { // 120 seconds = 2 minutes
            return res.json({
                status: 'F', message: "otp expired..!"
            })
        }
        // Check if the OTP matches
        if (user.otp !== otp) {
            return res.json({
                status: 'F', message: "Invalid OTP"
            })
        }
        // OTP is valid and not expired, proceed with verification
        await OrgMeModel.updateOne({ email }, { isemailerified: true, otp: null, otpSentAt: null });
        res.json({
            status: 'P', message: "OTP verified successfully!!"

        })
    } catch (error) {
        console.log('ERRRRRORR')
        console.log(error);
        
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }

}

// REusable OTP generator
function getOTP() {
    return Math.floor(10000 + Math.random() * 90000);;
}