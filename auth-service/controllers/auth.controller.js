import User from '../models/user.model.js';
import generateToken from '../utils/generateToken.js';

export const regitserUser = async(re, res) => {
    const {username, email, password} = req.body;
    
    try{
    const userExists = await User.find({email});

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

    res.status(201).json({
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
    });
    }catch(error) {
        return res.status(500).json({message: 'Server error'});
    }
    
}

export const loginUser = async(req, res) => {
    const {email, password} = req.body;

   try {
        const user = await User.findOne({email });

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
        return res.status(500).json({message: 'Server error'});
    }
    
}