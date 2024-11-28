import dotenv from 'dotenv';
import Permission from '../../models/permissionModel.js';
import { validationResult } from 'express-validator';

dotenv.config();

export const addPermission = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: true,
                description: 'Error Handler!',
                errors: errors.array()
            });
        }

        const { permission_name } = req.body;

        const isExistPermission = await Permission.findOne({ permission_name });

        if(isExistPermission){
            return res.status(201).json({
                success: true,
                description: 'Permission already added!',
            });
        }

        var obj = {
            permission_name
        };

        if(req.body.default){
            obj.is_default = parseInt(req.body.default);
        }

        const permission = new Permission( obj );

        const permissionData = await permission.save();

        return res.status(200).json({
            success: true,
            description: 'Permission added Successfully!',
            permissionData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}