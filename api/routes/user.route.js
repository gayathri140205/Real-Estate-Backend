import express from 'express';
import { updateUser, test, deleteUser, 
    getUserListings, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update', updateUser);
router.delete('/delete',  deleteUser);
router.get('/listings',getUserListings);
router.get('/get', getUser);

export default router;