import JWT from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthToken } from "../../types";
import { constantVariables } from "../../config/variables";

export const generateToken = (data: AuthToken) => {
  return JWT.sign(data, constantVariables.jwt_secret!, { expiresIn: "7d" });
};

export const generateHash = async (password: string) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);

  return hash;
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};
