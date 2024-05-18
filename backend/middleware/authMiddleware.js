import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async(req , res , next) =>{
    let token;
    token = req.cookies.jwt; 

    if (token){
        try {
            const decoder = jwt.verify(token , process.env.JWT_SECRET);

            req.user = await User.findById(decoder.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Invalid token')
        }

    }else{
        res.status(405);
        throw new Error('Invalid token');
    }
}
)

export {protect};