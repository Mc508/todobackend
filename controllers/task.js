import { Task } from "../models/task.js";
import ErrorHandler from "../middlewares/error.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, discription } = req.body;
    await Task.create({
      title,
      discription,
      user: req.user
    });

    res.status(201).json({
      success: true,
      message: "task added successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const myTask = async (req, res,next) => {
  try {
    const userid = req.user._id;
    const task = await Task.find({ user: userid });
    res.status(201).json({
      success: true,
      task
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Invalid Id", 404));
    task.isComleted = !task.isComleted;
    await task.save();
    res.status(201).json({
      success: true,
      message: "task updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Invalid Id", 404));
    await task.deleteOne();
    res.status(201).json({
      success: true,
      message: "deleted"
    });
  } catch (error) {
    next(error);
  }
};
