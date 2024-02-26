import express from 'express';
import { providePrescription } from '../Controllers/prescriptionController.js';

const router = express.Router();

router.post('/provide',providePrescription);

export default router;