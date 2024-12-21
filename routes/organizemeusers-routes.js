const express = require("express");
const OrgMeModel = require("../models/organizeme-model");
const router = express.Router();
const jwt = require("jsonwebtoken");
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

    router.route("/login")
    .post(login);


module.exports = router;

// Controllers save user
async function addOrganizeMeUsers(req, res, next) {
    try {
        // const newAdmin = await AdminModel.create(req.body);
        const newuser = await OrgMeModel.create(req.body);
        res.status(201).json({
            success: true,
            data: {
                newuser
            }
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error?.message
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
            res.status(404).json({
                success: false, message: "Email not exist"
            })
        }

        // Generate a new OTP
        const otp = getOTP();
        const otpSentAt = new Date();
        // Update the OTP field for the given email
        await OrgMeModel.updateOne({ email }, { otp, otpSentAt });

        // Here, you can integrate your email service to send the OTP to the user's email
        res.json({
            success: true, message: "OTP sent successfully!!",  otp, otpSentAt
        })
    } catch (error) {
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
            return res.status(404).json({
                success: false, message: "Email not exist"
            })
        }
        // Check if the OTP is expired
        const currentTime = new Date();
        const otpAge = (currentTime - user.otpSentAt) / 1000; // Age in seconds
        if (otpAge > 120) { // 120 seconds = 2 minutes
            return res.status(401).json({
                success: false, message: "otp expired..!"
            })
        }
        // Check if the OTP matches
        if (user.otp !== otp) {
            return res.status(401).json({
                success: false, message: "Invalid OTP"
            })
        }
        // OTP is valid and not expired, proceed with verification
        await OrgMeModel.updateOne({ email }, { isemailerified: true, otp: null, otpSentAt: null });
        res.status(200).json({
            success: true, message: "OTP verified successfully!!"

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

const JWT_SECRET = process.env.JWT_SECRET;
// Login 
async function login(req, res) {
  try {
    const {email} = req.body;
    const user = await OrgMeModel.findOne({ email });
    if (!user) return res.status(401).json({ message: 'user not found', success: false });
    if(!user.isemailerified) return res.status(401).json({ success: false , message: "email not verified",isemailerified:user.isemailerified });
   // Create JWT token if verified email is true
   const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
   res.status(200).json({ message: "success",token,isemailerified:user.isemailerified });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}