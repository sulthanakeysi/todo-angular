const mongoose = require("mongoose");

//creating schema
const todoSchema = new mongoose.Schema({task: String,
                                  done: Boolean});

//converting to model
exports.todo = mongoose.model('todo', todoSchema, 'tasks');