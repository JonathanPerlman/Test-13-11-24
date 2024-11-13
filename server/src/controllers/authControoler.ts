import { Request, Response } from "express";
import User from "../models/user";


export const register = async (req: Request, res: Response): Promise<void> => {
    try{
        const userRequest = req.body;
        const existingUser = await User.findOne({ userName: req.body.userName });
        if (!existingUser) {
            const newUser = await User.create(userRequest);
            res.status(201).json({ data: newUser, success: true });
        } else {
            res.status(400).json("User already exists");
        }
    } catch (err) {
        res.status(500).json({ data: "Something went wrong", success: false });

    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        const findUser = await User.findOne({ userName: username });

        if (!findUser || findUser.password !== password) {
            res.status(400).json({ message: "User undefined or password incorrect" });
            return; 
        }
        res.status(200).json({ data: findUser, success: true }); 
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};




