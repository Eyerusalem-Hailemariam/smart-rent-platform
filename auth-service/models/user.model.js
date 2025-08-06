const mongoose =  require("mongoose");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Name is required"],
        unique: true,
        minlength : 2,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match : [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password : {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    }
});


module.exports = mongoose.model("User", userSchema);