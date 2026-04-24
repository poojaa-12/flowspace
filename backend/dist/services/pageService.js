"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.softDeletePage = exports.updatePage = exports.createPage = exports.getPages = void 0;
const db_1 = require("../config/db");
const getPages = async (userId) => {
    const result = await db_1.db.query("SELECT * FROM pages WHERE owner_id = $1 AND is_deleted = false ORDER BY updated_at DESC", [userId]);
    return result.rows;
};
exports.getPages = getPages;
const createPage = async (userId, title, emoji, parentId) => {
    const result = await db_1.db.query("INSERT INTO pages (owner_id, title, emoji, parent_id) VALUES ($1, $2, $3, $4) RETURNING *", [userId, title, emoji, parentId ?? null]);
    return result.rows[0];
};
exports.createPage = createPage;
const updatePage = async (userId, pageId, updates) => {
    const result = await db_1.db.query(`UPDATE pages
     SET title = COALESCE($1, title),
         emoji = COALESCE($2, emoji),
         is_deleted = COALESCE($3, is_deleted),
         updated_at = NOW()
     WHERE id = $4 AND owner_id = $5
     RETURNING *`, [updates.title ?? null, updates.emoji ?? null, updates.isDeleted ?? null, pageId, userId]);
    return result.rows[0];
};
exports.updatePage = updatePage;
const softDeletePage = async (userId, pageId) => {
    await db_1.db.query("UPDATE pages SET is_deleted = true, updated_at = NOW() WHERE id = $1 AND owner_id = $2", [
        pageId,
        userId
    ]);
};
exports.softDeletePage = softDeletePage;
