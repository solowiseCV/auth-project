import * as mongoose from 'mongoose';
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Name field is required"] ,
        trim: true
    },
    email: {
        type: String,
        required: [true,"Email field is required"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email address'
        ]
    },
    password: {
        type: String,
        required: [true,"Password field is required"]
    },
    confirm_assword: {
        type: String,
        required: [true,"Confirm Password field is required"]
    },
    googleId: {
        type: String,
        required: false,
        unique: true
    },
    resetToken: {
        type: String,
        required: false,
        unique: false
    },
    tokenExpiration: {
        type: Date,
        required: false,
        unique: false
    },
    role: {
        type: String,
        default: "guest",
        enum: ["guest", "admin"]
    },
}, { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

export default mongoose.model('User', userSchema);
