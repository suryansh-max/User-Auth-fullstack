import expressAsyncHandler from 'express-async-handler';
import generateToken from '../utils/generateTokens.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

/**
 * @description authuser set token
 * @route post /api/users/auth
 * @access public
 */
const  authUser = expressAsyncHandler( async(req , res) =>{
    const { email , password } = req.body;
    const user = await User.findOne({email});

    const passwordCheck = user ? await bcrypt.compare(password , user.password) : null;

    if (user && passwordCheck){
        generateToken(res, user._id)
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email
        });
    }else{
        res.status(401);
        throw new Error('invalid email or password');
    }  

    res.status(200).json({message : 'auth user'});
})

/**
 * @description Register User
 * @route post /api/users/
 * @access public
 */
const  registerUser = expressAsyncHandler( async(req , res) =>{
    const {name , email , password} = req.body;
    const userExist = await User.findOne({ email });

    if (userExist){
        res.status(400);
        throw new Error('User already exist');
    }

    const user = await User.create({
        name,
        email,
        password : await hashPassword(password)
    });

    if (user){
        generateToken(res, user._id)
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email
        });
    }else{
        res.status(400);
        throw new Error('invalid user data');
    }  
})

/**
 * @description authuser set token
 * @route post /api/users/logout
 * @access public
 */
const  logOutUser = expressAsyncHandler( async(req , res) =>{
    res.cookie('jwt' , '' , {
        httpOnly : true,
        expires : new Date(0)
    })
    res.status(200).json({message : 'log out user success'});
})

/**
 * @description get user profile
 * @route Get /api/users/profile
 * @access private
 */
const  userProfile = expressAsyncHandler( async(req , res) =>{
    
    const user = {
        id : req.user._id,
        name : req.user.name,
        email : req.user.email,
    }

    res.status(200).json({
        message : 'User Fetched Success',
        userData : user,
    });
})

/**
 * @description update user
 * @route put /api/users/profile
 * @access private
 */
const updateUser = expressAsyncHandler(async (req, res) => {
    try {
        let user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;

            if (req.body.password) {
                user.password = await hashPassword(req.body.password);
            }

            const updatedUser = await user.save();

            res.status(200).json({
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            });
        } else {
            res.status(404);
            throw new Error('User not found');
        }
    } catch (error) {
        if (!res.headersSent) {
            res.status(500).json({ message: error.message });
        } else {
            console.error("Error occurred after response was sent:", error);
        }
    }
});


/**
 * 
 * @param {gets password } password 
 * @returns hashed password using dcrypt
 */
const hashPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password , salt);
}

export {
    authUser , registerUser , logOutUser , userProfile , updateUser
}
