import mongoose, { Schema, Document, Model } from "mongoose";

export interface VendorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: string[];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable: boolean;
  coverImages: string[];
  rating: number;
  foods: mongoose.Types.ObjectId[];
}

const VendorSchema = new Schema<VendorDoc>(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    foodType: { type: [String], required: true },
    pincode: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvailable: { type: Boolean, default: false },
    coverImages: { type: [String], default: [] },
    rating: { type: Number, default: 0 },
    foods: [{ type: Schema.Types.ObjectId, ref: "Food" }]
  },{
    toJSON:{
      transform(doc,ret:any){
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      }
    },
  
   timestamps: true 
  });

export const Vendor: Model<VendorDoc> =
  mongoose.model<VendorDoc>("Vendor", VendorSchema);
