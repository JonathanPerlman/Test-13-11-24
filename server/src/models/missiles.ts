import mongoose from "mongoose";

interface IMissile extends Document {
    name: string;
    description: string;
    speed: number;
    intercepts: string[];
    price: number;
}

const missileSchema = new mongoose.Schema<IMissile>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    speed: { type: Number, required: true },
    intercepts: { type: [String], required: true },
    price: { type: Number, required: true },
});


const Missile = mongoose.model<IMissile>("Missile", missileSchema);

export default Missile;


