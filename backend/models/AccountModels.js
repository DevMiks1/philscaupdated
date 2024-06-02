/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: { type: String, unique: true },
  firstname: { type: String },
  lastname: { type: String },
  suffix: { type: String },

  role: {
    type: String,
    enum: ["student", "faculty", "staff", "admin"],
    required: true,
  },
  position: String,
  course: String,
  year: String,
  schoolyear: String,
  semestertype: String,
  address: String,
  contactnumber: String,
  contactperson: String,
  birthdate: Date,
  isIdIssued: Boolean,
  position: String,
  designation: String,
  hgt: String,
  wgt: String,
  sss: String,
  tin: String,
  picture: {
    type: String,
    required: false,
  },
  affidavit: String,
  schoolid: String,
  message: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isNew) {
    let prefix;
    if (user.role === "student") {
      prefix = "ST";
    } else if (user.role === "faculty") {
      prefix = "FT";
    } else if (user.role === "staff") {
      prefix = "SF";
    } else {
      return next(); // No custom ID for admin
    }

    // Find the latest user with the same prefix and increment the number
    const latestUser = await mongoose
      .model("Account")
      .findOne({ userId: new RegExp(`^${prefix}-\\d{3}$`) })
      .sort({ userId: -1 });
    let seq = 1;
    if (latestUser) {
      const latestSeq = parseInt(latestUser.userId.split("-")[1], 10);
      seq = latestSeq + 1;
    }
    user.userId = `${prefix}-${String(seq).padStart(3, "0")}`;
  }

  next();
});

module.exports = mongoose.model("Account", userSchema);