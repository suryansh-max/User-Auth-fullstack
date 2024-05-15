import express from 'express';
import { authUser , registerUser , logOutUser , userProfile , updateUser } from '../controllers/userController.js';
const router = express.Router();

router.post('/' , registerUser    );
router.post('/logout' , logOutUser  );
router.post('/auth' , authUser );
router.route('/profile').get(userProfile).put(updateUser);

export default router;

