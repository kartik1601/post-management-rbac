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

        var updatedPermission = {
            permission_name
        };

        if(req.body.default){
            updatedPermission.is_default = parseInt(req.body.default);
        }

        const permission = new Permission( updatedPermission );

        const permissionData = await permission.save();

        return res.status(200).json({
            success: true,
            description: 'Permission added Successfully!',
            data: permissionData
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const getPermission = async(req,res) => {
    try {
        const permissions = await Permission.find({});

        return res.status(200).json({
            success: true,
            description: 'Permissions fetched successfully!',
            data: permissions
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const getPermissionById = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: true,
                description: 'Error Handler!',
                errors: errors.array()
            });
        }
        
        const { id } = req.body;
        const permission = await Permission.findById({ _id: id });

        return res.status(200).json({
            success: true,
            description: 'Permissions fetched successfully!',
            data: permission
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const deletePermission = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: true,
                description: 'Error Handler!',
                errors: errors.array()
            });
        }

        const { id } = req.body;

        await Permission.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            description: 'Permission deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const updatePermission = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: true,
                description: 'Error Handler!',
                errors: errors.array()
            });
        }

        const { id, permission_name } = req.body;

        const isExistId = await Permission.findOne({ _id: id });

        if(!isExistId){
            return res.status(201).json({
                success: true,
                description: 'Permission ID not found!',
            });
        }

        const isExistPermission = await Permission.findOne({ 
            _id: {$ne: id}, 
            permission_name 
        });

        if(isExistPermission){
            return res.status(201).json({
                success: true,
                description: 'Permission name already assigned!',
            });
        }

        var updatedPermission = {
            permission_name
        };

        if(req.body.default != null){
            updatedPermission.is_default = parseInt(req.body.default);
        };

        const updatedPermissionData = await Permission.findByIdAndUpdate(
            { _id: id }, 
            { $set: updatedPermission },
            { new: true}
        );

        return res.status(200).json({
            success: true,
            description: 'Permission updated Successfully!',
            data: updatedPermissionData,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}