import express from 'express'
import { getCustomData } from '../Controllers/GetCustomData.js';

const router = express.Router();

router.get('/' , getCustomData)

export default router;