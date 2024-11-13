import e from "express";
import mongoose from "mongoose";


interface IOrganization extends Document {
    name: string;
    resources: {
      name: string;
      amount: number;
    }[];
    budget: number;
};


const organizationSchema = new mongoose.Schema<IOrganization>({
    name: { type: String, required: true },
    resources: { type: [{ name: String, amount: Number }], required: true },
    budget: { type: Number, required: true },
  });

const Organization = mongoose.model<IOrganization>("Organization", organizationSchema);

export default Organization