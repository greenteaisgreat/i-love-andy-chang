/* eslint-disable no-empty */
const Task = require('../models/TaskModel');

const taskController = {};

taskController.postTask = async(req, res, next) => {
  const task = req.body.item;
  const time = req.body.created_at;

  try {
    const postTask = await new Task.create({
      item: task,
      created_at: time
    });

    res.locals.postTask = postTask;
    return next();
  }
  catch(err) {
    return next({
      log: 'An error occurred in the postTask middleware',
      status: 500,
      message: {
        err: 'An error occurred while trying to post your task'
      }
    });
  }
};

taskController.getTask = async(req, res, next) => {

  try {
    const getTask = await Task.find();

    res.locals.getTask = getTask;
    return next();
  }
  catch(err) {
    return next({
      log: 'An error occurred in the getTask middleware',
      status: 404,
      message: {
        err: 'An error occurred while trying to get your tasks'
      }
    });
  }
};

taskController.deleteTask = async(req, res, next) => {
  const id = req.body.id;

  try {
    const deleteTask = await Task.deleteOne({
      _id: id
    });

    if (!deleteTask) return next({
      log: 'The task ID does not exist within the database',
      status: 404,
      message: {
        err: 'No such task ID exists'
      }
    });

    res.locals.deleteTask = deleteTask;
  }
  catch(err) {
    return next({
      log: 'An error occurred in the deleteTask middleware',
      status: 500,
      message: {
        err: 'An error occurred while trying to delete your task'
      }
    });
  }
};



module.exports = taskController;
