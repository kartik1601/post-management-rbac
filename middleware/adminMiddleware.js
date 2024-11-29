export const adminAccess = async(req,res,next) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({
                success: false,
                description: 'User not authorized to access this resource!'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Something went wrong!'
        });
    }

    return next();
}

export const moderatorAccess = async(req,res,next) => {
    try {
        if(req.user.role !== 'admin' || req.user.role !== 'moderator'){
            return res.status(203).json({
                success: true,
                description: 'User not authorized to access this resource!'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Something went wrong!'
        });
    }
    
    return next();
}

export const editorAccess = async(req,res,next) => {
    try {
        if(req.user.role === 'user'){
            return res.status(203).json({
                success: true,
                description: 'User not authorized to access this resource!'
            });
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Something went wrong!'
        });
    }
    
    return next();
}