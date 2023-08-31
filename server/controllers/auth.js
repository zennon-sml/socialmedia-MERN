import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import mongoose from "mongoose";

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random()),
            impress: Math.floor(Math.random())
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err ){
        res.status(500).json({ 
            msg:"could not register",
             error: err.message 
        });
    }
}

/* LOGIN */
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email});
        if (!user) return res.status(400).json({ msg: "User is does not exist."})

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials."})

        const token = jwt.sign({id : user._id }, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch (err) {
        res.status(500).json({
            msg: "could not log in",
            error: err.message
        })
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
      } catch (err) {
        console.error('Error retrieving items:', err);
      }
}