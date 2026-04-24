import { Request, Response } from "express";
import * as pageService from "../services/pageService";

export const getPages = async (req: Request, res: Response): Promise<void> => {
  const pages = await pageService.getPages(req.user!.id);
  res.json({ pages });
};

export const createPage = async (req: Request, res: Response): Promise<void> => {
  const { title, emoji, parentId } = req.body;
  const page = await pageService.createPage(req.user!.id, title, emoji, parentId);
  res.status(201).json({ page });
};

export const updatePage = async (req: Request, res: Response): Promise<void> => {
  const page = await pageService.updatePage(req.user!.id, req.params.id, req.body);
  res.json({ page });
};

export const deletePage = async (req: Request, res: Response): Promise<void> => {
  await pageService.softDeletePage(req.user!.id, req.params.id);
  res.json({ success: true });
};

