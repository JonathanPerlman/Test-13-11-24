import { Request, Response } from "express";
import User from "../models/user";
import Organization from "../models/organizationfjhfhjfhjfhj";

export const getOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, organization, region } = req.body;

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }

        const orgName = region ? `${organization} - ${region}` : organization;

        const orgData = await Organization.findOne({ name: orgName });

        if (!orgData) {
            res.status(404).json({ message: "Organization not found or region mismatch", success: false });
            return;
        }

        res.status(200).json({
            data: orgData,
            success: true
        });
        
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};
