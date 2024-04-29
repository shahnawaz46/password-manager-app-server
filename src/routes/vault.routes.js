import express from 'express';
import {
  addVault,
  deleteVault,
  getAllVault,
} from '../controller/vault.controller.js';
import { verification } from '../middleware/verification.js';
import { validate } from '../middleware/validate.joi.js';
import { vaultSchema } from '../validation/validationSchema.joi.js';

const router = express.Router();

router.get('/password', verification, getAllVault);
router.post('/password', verification, validate(vaultSchema), addVault);
router.delete('/password', verification, deleteVault);
router.patch('');

export default router;
