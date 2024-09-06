const AdminModel = require("../models/admin-model");
const path = require('path');

exports.getAdmin = (req, res, next) => {
    res.send('ADMIN CTRL');
}


exports.getConfidencialAdmin = (req, res, next) => {
    // res.send("Confidencial...")
    // console.log('PATH ',__dirname);
    // res.sendFile(path.join(__dirname, '../public/templates/index.html'));
}

exports.addAdmin = async (req, res, next) => {
    try {
        // const newAdmin = await AdminModel.create(req.body);
        const { username, password } = req.body;
        const newAdmin1 = new AdminModel({username, password});
        const saved = await newAdmin1.save();
        res.status(201).json({
            status: 'success',
            data: {
                saved
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }

}