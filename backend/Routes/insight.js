import express from 'express';
import { getInsights} from '../Controllers/InsightsController.js';

const router = express.Router();

router.get('/',getInsights);

export default router;