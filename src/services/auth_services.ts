import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user_model";

class Auth_Services {
  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user || !user.password) {
      throw createHttpError(401, "Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw createHttpError(401, "Email or password is incorrect");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        contact: user.contact,
        userName: user.userName,
        fullName: user.fullName,
      },
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "1h" }
    );

    return {
      token,
    };
  }
}

export default new Auth_Services();
