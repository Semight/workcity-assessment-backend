// src/routes/project.routes.ts
import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  getProjectsByClient,
} from '../controllers/project.controller';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.use(protect); // all project routes protected

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Fetch projects for a specific client
router.get('/client/:clientId', getProjectsByClient);

export default router;
