import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(//creates a schema for "user" with the properties of a mongoose schema 
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50
        },
        lastName: {
            type: String,
            default: "dft lastName",
            min: 2,
            max: 50
        },
        email: {
            type: String,
            required: true,
            man: 100,
            unique: true
        },
        password: {
            type: String,
            required: true,
            min: 4
        },
        picturePath: {
            type: String,
            default: "",
        },
        friends: {
            type: Array,
            default: []
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);//sets the schema for the user
export default User;