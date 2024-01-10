const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teamMembers: {
    type: [String],
  },
});

module.exports = mongoose.model('Project', projectSchema);
