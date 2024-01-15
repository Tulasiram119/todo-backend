const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompelted: {
    type: Boolean,
    default: false,
  },
  lastDate: {
    type: Date,
    default: Date.now,
  },
  importance: {
    type: String,
    default: "B",
  },
});

module.exports = mongoose.model("Todo", todoSchema);
