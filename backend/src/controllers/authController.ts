import { Request, Response } from "express";
import * as authService from "../services/authService";

const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error instanceof Error && error.message.trim()) return error.message;
  if (typeof error === "string" && error.trim()) return error;
  if (error && typeof error === "object") {
    const maybeMessage = (error as { message?: unknown }).message;
    if (typeof maybeMessage === "string" && maybeMessage.trim()) return maybeMessage;
  }
  return fallback;
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayName } = req.body;
    const data = await authService.signup(email, password, displayName);
    res.status(201).json(data);
  } catch (error) {
    console.error("Signup failed:", error);
    res.status(400).json({ error: getErrorMessage(error, "Signup failed") });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (error) {
    console.error("Login failed:", error);
    res.status(401).json({ error: getErrorMessage(error, "Invalid credentials") });
  }
};

