const User =  require('../models/user.model.js');
const generateToken = require('../utils/generateToken.js');
const bcrypt = require('bcryptjs');



const registerUser = async(req, res) => {

    const {username, email, password} = req.body;   

    console.log(req.body);
    
    try{
    const userExists = await User.findOne({email});
    console.log('User exists:', userExists);

    if(userExists) {
        return res.status(400).json({message: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    console.log('New user:', newUser);

    await newUser.save();
    
    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
    });
    }catch(error) {
        console.error('Error during registration:', error);
        return res.status(500).json({message: 'Server error'});
    }
    
}
 const loginUser = async(req, res) => {
    const {email, password} = req.body;

    console.log('Login payload:', req.body);

   try {
        const user = await User.findOne({email });
        console.log('Found user:', user);
    
    if(!user) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({message: 'Invalid email or password'});
    }

   
    return res.status(200).json({
        message: 'Login successful',
        user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        }
    });
   }catch(error) {
        console.error('Error during login:', error);
        
    }
    
}

module.exports = {
    registerUser,
    loginUser
};