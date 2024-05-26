const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authmiddleware");
const { getAccounts, getAllAccounts, updateAccounts, addAccount, deleteUser } = require('../controllers/AccountControllers'); 

// Define the route for retrieving all user accounts
router.get("/retrieveAll", authMiddleware, getAllAccounts);

// Define the route for retrieving a single user account
router.get("/retrieve/:id", authMiddleware, getAccounts);

// Define the route for updating a user account
router.patch("/update/:id", authMiddleware, updateAccounts);

// Define the route for adding a user account
router.post("/create", authMiddleware, addAccount);

// Define the route for deleting a user account
router.delete("/delete/:id", authMiddleware, deleteUser);

module.exports = router;
