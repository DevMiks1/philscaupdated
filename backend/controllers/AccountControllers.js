/** @format */

const accountsModel = require("../models/AccountModels");


// RESPONSIBLE TO GET A SINGLE ACCOUNT
exports.getAccounts = async (req, res) => {
  const accountId = req.params.id;

  try {
    // CHECK THE ACCOUNT ID IF ITS EXIST IN THE DATABASE
    const account = await accountsModel.findById(accountId);

    // CONDITIONAL AND CHECKING IF THE ACCOUNT IS EXIST OR NOT
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ message: "Account not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// RESPONSIBLE TO GET ALL THE ACCOUNTS
exports.getAllAccounts = async (req, res) => {
  try {
    // CHECK ALL THE ACCOUNTS IF ITS EXIST IN THE DATABASE
    const account = await accountsModel.find();
    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// RESPONSIBLE TO UPDATE THE ACCOUNTS
exports.updateAccounts = async (req, res) => {
  const accountId = req.params.id;
  const set = req.body;

  try {
    // CHECK THE ACCOUNT AND UPDATE TO THE DATABASE
    const account = await accountsModel.findByIdAndUpdate(accountId, set, {
      new: true,
    });

    // CONDITIONAL AND CHECKING IF THE ACCOUNT IS UPDATED OR NOT
    if (account) {
      return res.status(200).json({
        success: true,
        message: "Account updated successfully",
        newData: account,
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Account is not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update account" });
  }
};

// RESPONSIBLE TO ADD ACCOUNT
exports.addAccount = async (req, res) => {
    try {
      const accountData = req.body;
  
      // if (accountData.password !== accountData.confirmpassword) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Passwords do not match",
      //   });
      // }
  
      // const existingUsername = await accountsModel.findOne({
      //   username: accountData.username.toLowerCase(),
      // });
  
      // if (existingUsername) {
      //   return res.status(409).json({
      //     success: false,
      //     message: "Username is already taken",
      //   });
      // }
  
   
  
   
  
      // CREATE AND ADD ACCOUNT TO THE DATABASE
      const account = await accountsModel.create(accountData);
  
      // Return success response
      return res.status(201).json({
        success: true,
        message: "Account added successfully",
        data: account,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "Failed to add user",
        error: error.message, // Include the error message for debugging
      });
    }
};
  

exports.deleteUser = async (req, res) => {
  const accountId = req.params.id;

  try {
    const account = await accountsModel.findByIdAndDelete(accountId);
    if (account) {
      return res
        .status(200)
        .json({ success: true, message: "Account deleted successfully" });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Account not found" });
    }
  } catch (error) {
    
    res
      .status(500)
      .json({ success: false, message: error.message});
  }
};
