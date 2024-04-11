const AdminModel = require("../models/admin-model");

exports.getAdmin = (req, res, next) => {
    res.send('ADMIN CTRL');
}

exports.addAdmin = async (req, res, next) => {
    try {
        const newAdmin = await AdminModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                newAdmin
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }

}