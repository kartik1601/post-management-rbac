import { validationResult } from "express-validator";
import Category from "../models/categoryModel.js";

export const addCategory = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: true,
                description: 'Error Handler!',
                error: errors.array()
            });
        }

        const { category_name } = req.body;

        const isExist = await Category.findOne({
            name: {
                $regex: category_name,
                $options: 'i' // non case sensitive
            },
        });

        if(isExist){
            return res.status(200).json({
                success: true,
                description: 'Category already exists!'
            });
        };

        const category = new Category({
            name: category_name,
        });

        const categoryData = await category.save();

        return res.status(200).json({
            success: true,
            description: 'Category added successfully!',
            data: categoryData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const getCategories = async(req,res) => {
    try {
        const categories = await Category.find({});
        
        return res.status(200).json({
            success: true,
            description: 'Categories fetched successfully!',
            data: categories,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const deleteCategory = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: true,
                description: 'Error Handler!',
                error: errors.array()
            });
        }

        const { id } = req.body;

        const isExist = await Category.findOne({ _id: id });

        if(!isExist){
            return res.status(200).json({
                success: false,
                description: 'Category does not exists!'
            });
        };

        await Category.findByIdAndDelete({ _id: id });
        
        return res.status(201).json({
            success: true,
            description: 'Category deleted successfully!',
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}

export const updateCategory = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                success: true,
                description: 'Error Handler!',
                error: errors.array()
            });
        }

        const { id, category_name } = req.body;

        const isExist = await Category.findOne({ _id: id });

        if(!isExist){
            return res.status(200).json({
                success: false,
                description: 'Category does not exists!'
            });
        };

        const isNameExist = await Category.findOne({
            _id: { $ne: id },
            name: {
                $regex: category_name,
                $options: 'i' 
            }
        });

        if(isNameExist){
            return res.status(200).json({
                success: true,
                description: 'Category name already assigned!'
            });
        };

        const updatedData = await Category.findByIdAndUpdate(
            { _id: id },
            { $set: { name: category_name } },
            { new: true}
        );

        return res.status(200).json({
            success: true,
            description: 'Category updated successfully!',
            data: updatedData,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: error.message
        });
    }
}