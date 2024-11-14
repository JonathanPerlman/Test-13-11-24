import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const userRequest = req.body;
        const existingUser = await User.findOne({ username: req.body.username });
        if (!existingUser) {
            const newUser = await User.create(userRequest);
            res.status(201).json({ data: newUser, success: true });
        } else {
            res.status(400).json("User already exists");
        }
    } catch (err) {
        res.status(500).json({ data: "Something went wrong", success: false });
    }
};
        
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const findUser = await User.findOne({ username: username });

        if (!findUser || findUser.password !== password) {
            res.status(400).json({ message: "User undefined or password incorrect" });
            return;
        }
        const token = jwt.sign(
            { userId: findUser._id, organization: findUser.organization, region: findUser.region}, 
            process.env.JWT_SECRET || "your_secret_key", 
            { expiresIn: "1h" }  
        );
        console.log(token);
        
        
        res.status(200).json({ data: token, success: true });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};




