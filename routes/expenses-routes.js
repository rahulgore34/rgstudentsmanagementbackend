const express = require("express");
const ExpenseModel = require("../models/dailyexpense-model");
const router = express.Router();

router.route("/")
    .get(getExpenses)
    .post(addExpenses)

router.route("/config")
    .get(getExpensesConfig)

// router.route("/confidencialadminsignup")
// .post(addAdmin);

async function getExpenses(req, res) {

    try {
        // Access the user ID from the authenticated user
        const userId = req.user.userId;

        // Find expenses that belong to this user
        const expenses = await ExpenseModel.find({ user: userId });

        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
}

async function addExpenses(req, res) {
    try {
        const { category, description, amount, paymentMethod } = req.body;
        const userId = req.user.userId; // Assume this is obtained from authentication
        console.log('While adding...');
        console.log(userId);


        const expense = new ExpenseModel({
            category,
            description,
            amount,
            paymentMethod,
            user: userId,
        });

        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

function getExpensesConfig(req, res) {
    res.json({
        paymentMethods: ExpenseModel.schema.path('paymentMethod').enumValues,
        categories: ExpenseModel.schema.path('category').enumValues,
    });
}

module.exports = router;