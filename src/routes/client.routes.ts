// src/routes/client.routes.ts
import express from 'express';
import {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
} from '../controllers/client.controller';
import { protect } from '../middlewares/auth';

const router = express.Router();

router.use(protect); // all client routes are protected

router.post('/', createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.put('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;
