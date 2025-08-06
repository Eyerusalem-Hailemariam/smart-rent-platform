import jwt from 'jsonwebtoken';
const jwtSecret = process.env.JWT_SECRET


const generateToken = (user) => {
     const payload = {
        user_id : user._id,
        username: user.username,
        email: user.email
    }

    const token = jwt.sign(
        payload,
        jwtSecret,
        { expiresIn: '1h' }
    )

    const sendBack = {
        user_token : token,
    } 

    return sendBack;
}

export default generateToken;
