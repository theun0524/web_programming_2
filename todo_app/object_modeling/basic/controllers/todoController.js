var Todo = require('../models/todo');

// Display list of all Todos.
exports.list = async (req, res, next) => {
  try {
    const todos = await Todo.find().exec();
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

// Handle Todo create on POST.
exports.create = async (req, res, next) => {
  try {
    const todo = await Todo.create({
      title: req.body.title,
      completed: req.body.completed,
    });
    
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

// Handle Todo update on PUT.
exports.update = async (req, res, next) => {
  try {
    const todo = await Todo
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .exec();

    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

// Handle Todo delete on DELETE.
exports.delete = async (req, res, next) => {
  try {
    await Todo
      .findByIdAndDelete(req.params.id)
      .exec();

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};
