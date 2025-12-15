import mongoose, { Schema, Document } from "mongoose";

export interface FoodDoc extends Document {
vendorId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  category: string;
  foodType: string;
  readyTime: number;
  price: number;
  rating:number;
  images:[string];
}

const FoodSchema: Schema = new Schema({
  vendorId: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
  name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    foodType: { type: String, required: true },
    readyTime: { type: Number, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    images: { type: [String], default: [] }
},{
    toJSON:{
      transform(doc,ret:any){
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      }
} ,
    timestamps: true 
});
export const Food = mongoose.model<FoodDoc>("Food", FoodSchema);