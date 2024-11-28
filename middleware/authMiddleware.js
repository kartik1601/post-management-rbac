import jwt from 'jsonwebtoken';

const verifyToken = async(req,res,next) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];

    if(!token){
        return res.status(403).json({
            success: false,
            description: 'User must be authenticated to access this resource!'
        });
    }

    try {
        const arrBT = token.split(' ');
        const bearerToken = arrBT[1];
        
        const decodedData = jwt.verify(bearerToken, process.env.SECRET_TOKEN);

        req.user = decodedData.user;
    } catch (error) {
        return res.status(400).json({
            success: false,
            description: 'Invalid Token!'
        });
    }

    return next();
}

export default verifyToken;