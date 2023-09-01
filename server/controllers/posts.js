import Post from "../models/post.model.js";
import User from "../models/user.model.js";

/* CREATE */
export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            comments: []
        })
        await newPost.save(); 

    } catch (err) {
        res.status(409).json({ func: createPost, message: err.message });
    }
}