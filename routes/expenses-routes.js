const express = require("express");
const ExpenseModel = require("../models/dailyexpense-model");
const router = express.Router();

router.route("/")
    .get(getExpenses)
    .post(addExpenses)

router.route("/config")
    .get(getExpensesConfig);

router.route("/bulk")
    .post(bulkAddxxpenses);

// router.route("/confidencialadminsignup")
// .post(addAdmin);

async function getExpenses(req, res) {
    try {
        // Access the user ID from the authenticated user
        const userId = req.user.userId;

        // Find expenses that belong to this user
        const expenses = await ExpenseModel.find({ user: userId });

        res.json({
            success: true,
            data: {
                totalRecords: expenses.length,
                expenses
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch expenses' });
    }
}

async function addExpenses(req, res) {
    try {
        const { category, description, amount, paymentMethod } = req.body;
        const userId = req.user.userId; // Assume this is obtained from authentication
        const expense = new ExpenseModel({
            category,
            description,
            amount,
            paymentMethod,
            user: userId,
        });

        await expense.save();
        res.status(201).json({
            success: true,
            expense
        });
    } catch (error) {
        res.status(400).json({  success: false,message: error.message });
    }
}

function getExpensesConfig(req, res) {
    res.json({
        paymentMethods: ExpenseModel.schema.path('paymentMethod').enumValues,
        categories: ExpenseModel.schema.path('category').enumValues,
    });
}

async function bulkAddxxpenses(req, res) {
    try {
        const userId = req.user.userId;
        const expenses = req.body.expenses;

        // Map each expense to include the user ID
        const expensesWithUser = expenses.map(expense => ({
            ...expense,
            user: userId
        }));

        // Insert multiple expenses into the database
        const result = await ExpenseModel.insertMany(expensesWithUser);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = router;
