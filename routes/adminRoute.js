const express = require('express');

const router = express.Router();

const {
  createProject,
  listProjects,
  editProject,
  deleteProject,
} = require('../controllers/adminController');

router.post('/create_project', createProject);
router.get('/list_projects', listProjects);
router.put('/edit_project/:id', editProject);
router.delete('/delete_project/:id', deleteProject);

module.exports = router;
