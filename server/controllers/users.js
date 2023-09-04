import User from "../models/user.model.js";

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;//get the id that comes of the get request
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({func: "getUser", message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try{
        const { id } = req.params;
        const user =  await User.findById(id);

        const friends = await Promise.all(
            // Using the map() function to retrieve User objects for the friend IDs of the user friend list
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
            )
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ func: "getUserFriends", message: err.message });
    }
}

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {//if the two are alread friends then its removed one from the list of the other and vice-versa
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendID);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();
        /* formating friends sending the "users" objects from the list of friends*/
        const friends = await Promise.all(
            // Using the map() function to retrieve User objects for the friend IDs of the user friend list
            user.friends.map((id) => User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        )

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ func: "addRemoveFriend", message: err.message });
    }
}