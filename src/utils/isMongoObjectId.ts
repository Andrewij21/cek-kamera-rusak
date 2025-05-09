import mongoose from "mongoose";

export default (id: string) => {
  return mongoose.isValidObjectId(id);
};
