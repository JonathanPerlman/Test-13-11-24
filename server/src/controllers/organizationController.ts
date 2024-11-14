import { Request, Response } from "express";
import User from "../models/user";
import Organization from "../models/organization";

export const getOrganization = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id, organization, region } = req.body;

        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: "User not found", success: false });
            return;
        }

        // let on = "";
        // if(region === ""){

        //     on =organization
        // }
        // else{
        //     on = `${organization} - ${region}`
        // }
        if (region === "") {
            const orgData = await Organization.findOne({ name: organization })
            if (!orgData) {
                res.status(404).json({ message: "Organization not found or region mismatch", success: false });
                return;
            }
            // const totalResources = orgData.resources.reduce((total, resource) => total + resource.amount, 0);

            res.status(200).json({
                data: orgData,
                success: true
            });
        }
        else {

            const orgData = await Organization.findOne({ name: `${organization} - ${region}` || { name: organization } })

            if (!orgData) {
                res.status(404).json({ message: "Organization not found or region mismatch", success: false });
                return;
            }

            // const totalResources = orgData.resources.reduce((total, resource) => total + resource.amount, 0);

            res.status(200).json({
                data: orgData,
                success: true
            });
        }


    } catch (error) {
        res.status(500).json({ message: "Something went wrong", success: false });
    }
};
