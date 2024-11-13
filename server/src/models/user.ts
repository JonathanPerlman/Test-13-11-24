import mongoose from "mongoose";
import { EnumType } from "typescript";



interface Iuser extends Document {
    username: string;
    password: string;
    organization: string;  
    region?: string;
}

const userSchema = new mongoose.Schema<Iuser>({ 
    username: { type: String, required: true },
    password: { type: String, required: true },
    organization: { type: String, required: true, enum:['IDF', 'Hezbollah', 'Hamas', 'Houthis', 'IRGC'] },
    region: { type: String, required: true, enum: ['North', 'South', 'Central', 'Judea and Samaria'] },
});


const User = mongoose.model<Iuser>("User", userSchema);

export default User

