import mongoose from "mongoose";
import { EnumType } from "typescript";



interface Iuser extends Document {
    username: string;
    password: string;
    organization: string;  
    region?: string;
    missiles?: {name: string; amount: number}
}

const userSchema = new mongoose.Schema<Iuser>({ 
    username: { type: String, required: true },
    password: { type: String, required: true },
    organization: { type: String, required: true },
    region: { type: String, required: false },
    missiles: { type: [{ name: String, amount: Number }], required: false },
});



const User = mongoose.model<Iuser>("User", userSchema);

export default User

