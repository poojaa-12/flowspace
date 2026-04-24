import { Request, Response } from "express";
import * as authService from "../services/authService";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, displayName } = req.body;
    const data = await authService.signup(email, password, displayName);
    res.status(201).json(data);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: (error as Error).message });
  }
};

