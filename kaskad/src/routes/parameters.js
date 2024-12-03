// routes/parameters.js
import express from 'express';
import { getParameters } from '../controllers/parametersController.js';

const router = express.Router();

router.get('/parameters/:parameterType', getParameters);

export default router;
