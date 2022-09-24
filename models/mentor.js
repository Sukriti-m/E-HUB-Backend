require("dotenv").config();
const mongoose = require("mongoose");
const validate = require("validator");

const Schema = mongoose.Schema;

const MentorSchema = new Schema(
  {
    mentorName: {
      type: String,
      required: true,
      minLength: 6,
    },
    mentorDomain: {
      type: String,
      required: true,
    },
    mentorNumber: {
      type: Number,
      required: true,
      maxLength: 10,
      minLength: 10,
    },
  },
  { timestamps: true }
);

const Mentor = new mongoose.model("Domain", MentorSchema);
module.exports = Mentor;
