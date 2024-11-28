export const adminAccess = async(req,res,next) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({
                success: false,
                description: 'User not allowed to access this resource!'
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