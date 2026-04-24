export interface User {
  id: string;
  email: string;
  displayName: string | null;
}

export interface Page {
  id: string;
  owner_id: string;
  title: string;
  emoji: string;
  parent_id: string | null;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}

