import { validationResult } from "express-validator";
import Post from '../models/postModel.js';

export const createPost = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                description: errors.array()
            });
        }

        const { title, description } = req.body;

        var obj = {
            title,
            description
        };

        if(req.body.categories){
            obj.categories = req.body.categories;
        }

        const post = new Post( obj );
        const postData = await post.save();

        const fullPostData = await Post.findOne({ _id: postData._id }).populate('categories');

        return res.status(200).json({
            success: true,
            description: 'Post created successfully!',
            data: fullPostData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Try-catch errors!',
            errors: error.message
        });
    }
}

export const getPosts = async(req,res) => {
    try {
        const posts = await Post.find({}).populate('categories');

        return res.status(200).json({
            success: true,
            description: 'Post fetched successfully!',
            data: posts
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Try-catch errors!',
            errors: error.array()
        });
    }
}

export const deletePost = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                description: error.array()
            });
        }

        const { id } = req.body;

        const isExists = await Post.findOne({ _id: id });

        if(!isExists){
            return res.status(200).json({
                success: false,
                description: 'Post does not exists!'
            });
        }

        await Post.findByIdAndDelete({ _id: id });

        return res.status(200).json({
            success: true,
            description: 'Post deleted successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Try-catch errors!',
            errors: error.message
        });
    }
}

export const updatePost = async(req,res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                description: errors.array()
            });
        }

        const { id, title, description } = req.body;

        const isExists = await Post.findOne({ _id: id });

        if(!isExists){
            return res.status(200).json({
                success: false,
                description: 'Post does not exists!'
            });
        }

        var obj = {
            title,
            description
        }

        if(req.body.categories){
            obj.categories = req.body.categories;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: id },
            { $set: obj },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            description: 'Post updated successfully!',
            data: updatedPost
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Try-catch errors!',
            errors: error.message
        });
    }
}

