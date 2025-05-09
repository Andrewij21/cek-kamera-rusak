import createError from "http-errors";
import Category from "../models/category_model";
import createHttpError from "http-errors";
import isMongoObjectId from "../utils/isMongoObjectId";

interface Body {
  name: string;
}

class Categories_Services {
  async getAll() {
    const categories = await Category.find({});
    return categories;
  }
  async getById(id: string) {
    if (!isMongoObjectId(id)) throw createHttpError(404);
    const category = await Category.findOne({ _id: id });
    if (!category) throw createHttpError(404);
    return category;
  }
  async add(body: Body) {
    if (Array.isArray(body)) {
      const valid = body.every((item) => item.name);

      if (!valid) {
        throw createHttpError(422, "Invalid request body in array");
      }

      const inserted = await Category.insertMany(body);
      return inserted;
    } else {
      if (!body.name) {
        throw createHttpError(422, "Invalid request body");
      }
      const newCategory = await Category.create(body);
      return newCategory;
    }
  }
  async update(id: string, body: Body) {
    if (!isMongoObjectId(id)) throw createHttpError(404);
    const category = await Category.findOneAndUpdate({ _id: id }, { ...body });
    if (!category) throw createHttpError(404);
    return category;
  }

  async delete(id: string) {
    if (!isMongoObjectId(id)) throw createHttpError(404);
    const category = await Category.findOneAndDelete({ _id: id });
    if (!category) throw createError(404);
    return category;
  }
}

export default new Categories_Services();
