import { model, Schema } from "mongoose";

const SymptomSchema = new Schema({
  name: { type: String, required: true },
  wight: { type: Number, required: false },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: false,
  },
});

export default model("symptom", SymptomSchema);
