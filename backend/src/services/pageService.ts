import { db } from "../config/db";

export const getPages = async (userId: string) => {
  const result = await db.query(
    "SELECT * FROM pages WHERE owner_id = $1 AND is_deleted = false ORDER BY updated_at DESC",
    [userId]
  );
  return result.rows;
};

export const createPage = async (userId: string, title: string, emoji: string, parentId?: string) => {
  const result = await db.query(
    "INSERT INTO pages (owner_id, title, emoji, parent_id) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, title, emoji, parentId ?? null]
  );
  return result.rows[0];
};

export const updatePage = async (
  userId: string,
  pageId: string,
  updates: { title?: string; emoji?: string; isDeleted?: boolean }
) => {
  const result = await db.query(
    `UPDATE pages
     SET title = COALESCE($1, title),
         emoji = COALESCE($2, emoji),
         is_deleted = COALESCE($3, is_deleted),
         updated_at = NOW()
     WHERE id = $4 AND owner_id = $5
     RETURNING *`,
    [updates.title ?? null, updates.emoji ?? null, updates.isDeleted ?? null, pageId, userId]
  );
  return result.rows[0];
};

export const softDeletePage = async (userId: string, pageId: string) => {
  await db.query("UPDATE pages SET is_deleted = true, updated_at = NOW() WHERE id = $1 AND owner_id = $2", [
    pageId,
    userId
  ]);
};

