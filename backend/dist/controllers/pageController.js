"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePage = exports.updatePage = exports.createPage = exports.getPages = void 0;
const pageService = __importStar(require("../services/pageService"));
const getPages = async (req, res) => {
    const pages = await pageService.getPages(req.user.id);
    res.json({ pages });
};
exports.getPages = getPages;
const createPage = async (req, res) => {
    const { title, emoji, parentId } = req.body;
    const page = await pageService.createPage(req.user.id, title, emoji, parentId);
    res.status(201).json({ page });
};
exports.createPage = createPage;
const updatePage = async (req, res) => {
    const page = await pageService.updatePage(req.user.id, req.params.id, req.body);
    res.json({ page });
};
exports.updatePage = updatePage;
const deletePage = async (req, res) => {
    await pageService.softDeletePage(req.user.id, req.params.id);
    res.json({ success: true });
};
exports.deletePage = deletePage;
