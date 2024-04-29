import express from 'express';
import { getAllPassword } from '../controller/vault.controller.js';
import { verification } from '../middleware/verification.js';

const router = express.Router();

router.get('/password', verification, getAllPassword);
router.post('');
router.delete('');
router.patch('');

export default router;
