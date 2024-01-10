const express = require('express');

const router = express.Router();

const {
  showMe,
  getProjects,
  createTask,
  listTasks,
  editTask,
  deleteTask,
} = require('../controllers/userController');

router.get('/me', showMe);
router.get('/get_projects', getProjects);
router.post('/create_task/:id', createTask); // id - projectId
router.get('/list_tasks/:id', listTasks); // id - projectId
router.put('/edit_task/:id', editTask); // id - taskId
router.delete('/delete_task/:id', deleteTask); // id - taskId

module.exports = router;
