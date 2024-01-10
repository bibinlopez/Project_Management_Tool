const Project = require('../models/projectSchema');

// to find currect user part of the specific project
const isUserIncludedThisProject = async (id, emailId) => {
  const project = await Project.findById(id);
  if (!project) {
    throw new CustomError('Project not found ', 404);
  }

  const teamMembers = project.teamMembers;

  const email = teamMembers.find((email) => email === emailId);

  if (!email) {
    throw new CustomError('You are not part of this Project');
  }
};

module.exports = isUserIncludedThisProject;
