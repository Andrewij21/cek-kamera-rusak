import createHttpError from "http-errors";
import DamageHistory from "../models/damage_history_model"; // pastikan path-nya sesuai

interface Body {
  name: string;
  desc?: number;
  solution?: string; // ObjectId sebagai string
}

class Damage_History_Services {
  async getAll() {
    return DamageHistory.find();
  }

  async getById(id: string) {
    const isDamageHistoryExist = await DamageHistory.findById(id);
    if (!isDamageHistoryExist)
      throw createHttpError(404, "Damage History not found");
    return DamageHistory;
  }

  async add(body: Body) {
    if (Array.isArray(body)) {
      const valid = body.every(
        (item) => item.name && item.desc && item.solution
      );

      if (!valid) {
        throw createHttpError(422, "Invalid request body in array");
      }

      const inserted = await DamageHistory.insertMany(body);
      return inserted;
    } else {
      if (!body.name) {
        throw createHttpError(422, "Invalid request body");
      }

      const newDamageHistory = new DamageHistory(body);
      await newDamageHistory.save();
      return newDamageHistory;
    }
  }

  async update(id: string, body: Partial<Body>) {
    const updated = await DamageHistory.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated) throw createHttpError(404, "DamageHistory not found");
    return updated;
  }

  async delete(id: string) {
    const deleted = await DamageHistory.findByIdAndDelete(id);
    if (!deleted) throw createHttpError(404, "DamageHistory not found");
    return deleted;
  }
}

export default new Damage_History_Services();
