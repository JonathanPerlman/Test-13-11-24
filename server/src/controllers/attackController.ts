import { Request, Response } from "express";
import User from "../models/user";
import Organization from "../models/organizationfjhfhjfhjfhj";
import Missile from "../models/missiles";

export const getAttackData = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;

        const missileDetails = await Missile.find({ name: name});

        if (!missileDetails) {
            res.status(404).json({ message: 'Missile not found' });
            return;
        }

        


        res.status(200).json(missileDetails);
    } catch (error) {
         res.status(500).json({ message: 'Server error', error });
    }
};