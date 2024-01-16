const mongoose = require("mongoose");
const Todo = require("../model/Todo");
const retriveAllTodos = async (req, res) => {
  const email = req.userEmail;
  const id = req.id;
  if (!email || !id) {
    return res.status(401).json({ message: "Invalid creditionals" });
  }
  try {
    const todos = await Todo.find({ user: id }).exec();
    return res.json({ todos });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
const createTodo = async (req, res) => {
  const email = req.userEmail;
  const id = req.id;
  if (!email || !id) {
    return res.status(401).json({ message: "Invalid creditionals" });
  }
  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "required fields are missing" });
  }
  try {
    const result = await Todo.create({
      title,
      description,
      user: id,
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const updateTodo = async (req, res) => {
  const id = req.params.id;
  if (id.length < 24) {
    return res.sendStatus(400);
  }
  try {
    const todo = await Todo.findOne({ _id: id }).exec();
    if (!todo) {
      return res.sendStatus(404);
    }
    const { title, description, lastDate, isCompelted, importance } = req.body;
    const updatedDoc = {
      $set: {
        title: title ? title : todo.title,
        description: description ? description : todo.description,
        lastDate: lastDate ? lastDate : todo.lastDate,
        isCompelted: isCompelted !== undefined ? isCompelted : todo.isCompelted,
        importance: importance ? importance : importance,
      },
    };
    const result = await Todo.updateOne({ _id: id }, updatedDoc);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const deleteTodo = async (req, res) => {
  const id = req.params.id;
  if (id.length < 24) {
    return res.sendStatus(400);
  }
  try {
    const todo = await Todo.findOne({ _id: id });
    if (!todo) {
      return res.sendStatus(404);
    }
    const result = await Todo.deleteOne({ _id: id });
    return res.json(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
const getASingleTodo = async (req, res) => {
  const id = req.params.id;
  if (id.length < 24) {
    return res.sendStatus(400);
  }
  try {
    const todo = await Todo.findOne({ _id: id }).exec();
    if (!todo) {
      return res.sendStatus(404);
    }
    return res.status(200).json(todo);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
module.exports = {
  retriveAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  getASingleTodo,
};
