import express from 'express';
import { updateUser, test, deleteUser, 
    getUserListings, getUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test);
router.post('/update', verifyToken, updateUser);
router.delete('/delete', verifyToken, deleteUser);
router.get('/listings', verifyToken, getUserListings);
router.get('/get', verifyToken, getUser);

export default router;