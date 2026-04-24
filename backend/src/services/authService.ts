import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../config/db";

const SALT_ROUNDS = 10;

export const signup = async (email: string, password: string, displayName?: string) => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const result = await db.query(
    "INSERT INTO users (email, password_hash, display_name) VALUES ($1, $2, $3) RETURNING id, email, display_name",
    [email, passwordHash, displayName ?? null]
  );
  const user = result.rows[0];
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
  return { token, user: { id: user.id, email: user.email, displayName: user.display_name } };
};

export const login = async (email: string, password: string) => {
  const result = await db.query("SELECT id, email, password_hash, display_name FROM users WHERE email = $1", [email]);
  const user = result.rows[0];
  if (!user) throw new Error("Invalid credentials");
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) throw new Error("Invalid credentials");
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d"
  });
  return { token, user: { id: user.id, email: user.email, displayName: user.display_name } };
};

