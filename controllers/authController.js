import User from '../models/userModel.js';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';

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
