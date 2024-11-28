import dotenv from 'dotenv';
import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

dotenv.config();

export const registerUser = async(req, res) => {
    try { 
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                description: 'Registration errors',
                errors: errors.array()
            });
        }

        const { name, email, password } =  req.body;
        
        const isExistUser = await User.findOne({email});

        if(isExistUser){
            return res.status(200).json({
                success: false,
                description: "User already registered!"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 16);
        
        const user =  new User({
            name,
            email,
            password:hashedPassword
        });

        const userData = await user.save();

        return res.status(200).json({
            success: true,
            description: 'Registered Successfully!',
            data: userData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

// random secret token
const secretToken = crypto.randomBytes(16).toString('hex');

process.env.SECRET_TOKEN = secretToken;

const generateAccessToken = async(user) => {
    const token = jwt.sign(user, secretToken, { expiresIn:"1h" });
    return token;
}

export const loginUser = async(req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: false,
                description: 'Login Errors!',
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(200).json({
                success: false,
                description: 'User not found! Please register yourself!'
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(200).json({
                success: false,
                description: 'Invalid Password!'
            });
        }

        const accessToken = await generateAccessToken({ user: user });

        return res.status(200).json({
            success: true,
            description: 'Login successful!',
            accessToken: accessToken,
            tokenType: 'Bearer',
            data: user
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const getProfile = async(req,res) => {
    try {
        const user_id = req.user._id;
        const userData = await User.findOne({ _id: user_id });

        return res.status(200).json({
            success: true,
            description: req.user
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}
