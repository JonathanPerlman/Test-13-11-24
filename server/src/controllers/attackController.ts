import { Request, Response } from "express";
import User from "../models/user";
import Organization from "../models/organization";
import Missile from "../models/missiles";

export const getAttackData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { attackName } = req.body;
        console.log(attackName);
        
        const data = await Missile.findOne({ name: attackName})
        console.log(data);
        

        if(!data){
            res.status(404).json({ message: "Organization not found", success: false });
            return;
        }

        const attackResponse = {
            name: data.name,
            speed: data.speed
        }

        res.status(200).json({
            data: attackResponse
        })
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};