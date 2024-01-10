const CustomError = require('../errors/customError');
const Project = require('../models/projectSchema');
const User = require('../models/userSchema');

const Task = require('../models/taskSchema');
const isUserIncludedThisProject = require('../middlewares/extra');

const showMe = async (req, res) => {
  const { userId } = req.user;
  const result = await User.findById(userId);
  return res.status(200).json({ success: true, data: result });
};

// get projects
const getProjects = async (req, res) => {
  const result = await Project.find({ teamMembers: req.user.email });

  return res
    .status(201)
    .json({ success: true, count: result.length, data: result });
};

//create task
const createTask = async (req, res) => {
  const { id } = req.params; // projectId
  const { userId, email } = req.user; // logged-user's id,email

  // invoke the function
  await isUserIncludedThisProject(id, email);

  const result = await Task.create({
    createdBy: userId,
    projectId: id,
    ...req.body,
  });

  return res
    .status(201)
    .json({ success: true, msg: 'Created..', data: result });
};

// list tasks
const listTasks = async (req, res) => {
  const { id } = req.params; // projectId
  const { userId, email } = req.user; // logged-user's id,email

  await isUserIncludedThisProject(id, email);

  const result = await Task.find({ projectId: id }).populate([
    {
      path: 'createdBy',
      select: 'email name',
    },
    {
      path: 'projectId',
      select: 'projectName description',
    },
  ]);
  // .populate(['createdBy', 'projectId']);

  return res
    .status(200)
    .json({ success: true, count: result.length, data: result });
};

// edit task
const editTask = async (req, res) => {
  const { id } = req.params; // taskId
  const { userId, email } = req.user; // logged-user's id,email

  const task = await Task.findById(id);

  const projectId = task.projectId;

  await isUserIncludedThisProject(projectId, email);

  const result = await Task.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json({ success: true, data: result });
};

// delete task
const deleteTask = async (req, res) => {
  const { id } = req.params; // taskId
  const { userId } = req.user; // userId

  const task = await Task.findById(id);

  if (task.createdBy.toString() !== userId) {
    throw new CustomError('You can not delete this task', 404);
  }

  await Task.findByIdAndDelete(id);

  return res.status(200).json({ success: true, msg: 'Deleted..' });
};

module.exports = {
  showMe,
  getProjects,
  createTask,
  listTasks,
  editTask,
  deleteTask,
};
