import createHttpError from "http-errors";
import Symptom from "../models/symptoms_model"; // pastikan path-nya sesuai

interface Body {
  name: string;
  wight?: number;
  category?: string; // ObjectId sebagai string
}

class Symptom_Services {
  async getAll() {
    return Symptom.find().populate("category");
  }

  async getById(id: string) {
    const symptom = await Symptom.findById(id).populate("category");
    if (!symptom) throw createHttpError(404, "Symptom not found");
    return symptom;
  }

  async add(body: Body) {
    if (Array.isArray(body)) {
      const valid = body.every(
        (item) => item.name && typeof item.wight === "number" && item.category
      );

      if (!valid) {
        throw createHttpError(422, "Invalid request body in array");
      }

      const inserted = await Symptom.insertMany(body);
      return inserted;
    } else {
      if (!body.name) {
        throw createHttpError(422, "Invalid request body");
      }

      const newSymptom = new Symptom(body);
      await newSymptom.save();
      return newSymptom;
    }
  }

  async update(id: string, body: Partial<Body>) {
    const updated = await Symptom.findByIdAndUpdate(id, body, { new: true });
    if (!updated) throw createHttpError(404, "Symptom not found");
    return updated;
  }

  async delete(id: string) {
    const deleted = await Symptom.findByIdAndDelete(id);
    if (!deleted) throw createHttpError(404, "Symptom not found");
    return deleted;
  }
}

export default new Symptom_Services();
