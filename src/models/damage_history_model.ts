import { model, Schema } from "mongoose";

const DamageHistorySchema = new Schema({
  name: { type: String, required: false },
  desc: { type: String, required: false },
  solution: {
    type: String,
    required: false,
  },
});

export default model("damage_history", DamageHistorySchema);
