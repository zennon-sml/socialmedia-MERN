import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getAllUsers,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ ROUTES */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
//get all users
router.get("/", getAllUsers)

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;