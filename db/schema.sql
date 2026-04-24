-- Run this once against your Supabase Postgres instance

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pages
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled',
  emoji TEXT DEFAULT '📄',
  parent_id UUID REFERENCES pages(id) ON DELETE SET NULL,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_pages_owner ON pages(owner_id);
CREATE INDEX idx_pages_parent ON pages(parent_id);

-- Onboarding events (activation funnel tracking)
-- Steps: signup | create_first_page | first_edit |
--        used_slash_command | invited_collaborator
CREATE TABLE onboarding_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  step TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  occurred_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_onboarding_user ON onboarding_events(user_id);
CREATE INDEX idx_onboarding_step ON onboarding_events(step);

-- Collaborators per page
CREATE TABLE page_collaborators (
  page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'editor', -- 'editor' | 'viewer'
  added_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (page_id, user_id)
);
