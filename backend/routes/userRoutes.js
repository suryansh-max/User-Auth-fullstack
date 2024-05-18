import express from 'express';
import { authUser , registerUser , logOutUser , userProfile , updateUser } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/' , registerUser    );
router.post('/logout' , logOutUser  );
router.post('/auth' , authUser );
router.route('/profile').get(protect, userProfile).put(protect , updateUser);

export default router;

