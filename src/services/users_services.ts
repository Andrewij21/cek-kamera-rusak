import createError from "http-errors";
import createHttpError from "http-errors";
import isMongoObjectId from "../utils/isMongoObjectId";
import User from "../models/user_model";
import bcrypt from "bcryptjs";

interface Body {
  email: String;
  password: String;
  role: String;
}

class Users_Services {
  async getAll() {
    const users = await User.find({});
    return users;
  }
  async getById(id: string) {
    if (!isMongoObjectId(id)) throw createHttpError(404);
    const user = await User.findOne({ _id: id });
    if (!user) throw createHttpError(404);
    return user;
  }
  async add(body: Body) {
    if (typeof body.email !== "string") throw createHttpError(422);
    if (typeof body.password !== "string")
      throw createHttpError(422, "Password is required");
    if (typeof body.role !== "string")
      throw createHttpError(422, "Role is required");

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await User.create({
      ...body,
      password: hashedPassword, // override plain password
    });

    return newUser;
  }

  async update(id: string, body: Body) {
    if (!isMongoObjectId(id)) throw createHttpError(404);
    const user = await User.findOneAndUpdate({ _id: id }, { ...body });
    if (!user) throw createHttpError(404);
    return user;
  }

  async delete(id: string) {
    if (!isMongoObjectId(id)) throw createHttpError(404);
    const user = await User.findOneAndDelete({ _id: id });
    if (!user) throw createError(404);
    return user;
  }
}

export default new Users_Services();
