import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI || "";
export default mongoose.connect(MONGO_URI, {
  autoIndex: true, // buat index sesuai schema secara otomatis
});
