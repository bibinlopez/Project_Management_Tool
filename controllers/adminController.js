const CustomError = require('../errors/customError');
const Project = require('../models/projectSchema');

const createProject = async (req, res) => {
  const result = await Project.create({ ...req.body });

  return res
    .status(201)
    .json({ success: true, msg: 'Created..', data: result });
};

const listProjects = async (req, res) => {
  const result = await Project.find({});

  return res
    .status(200)
    .json({ success: true, count: result.length, data: result });
};

const editProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    throw new CustomError('No Project in this id', 404);
  }

  const result = await Project.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true, runValidators: true }
  );

  return res.status(200).json({ success: true, data: result });
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);

  if (!project) {
    throw new CustomError('No Project in this id', 404);
  }

  await Project.findByIdAndDelete(id);

  return res.status(200).json({ success: true, msg: 'Deleted..' });
};

module.exports = { createProject, listProjects, editProject, deleteProject };
