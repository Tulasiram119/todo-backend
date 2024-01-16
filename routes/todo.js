const express = require("express");
const fetchUser = require("../middleware/fetchUser");
const {
  retriveAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getASingleTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/retriveAlltodos", fetchUser, retriveAllTodos);
router.post("/createTodo", fetchUser, createTodo);
router.put("/updateTodo/:id", fetchUser, updateTodo);
router.delete("/deleteTodo/:id", fetchUser, deleteTodo);
router.get("/getTodo/:id",fetchUser,getASingleTodo);

module.exports = router;
