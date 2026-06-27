-- schema.sql
-- Single source of truth for the Job Hunt Tracker DB schema
-- Run manually in Neon console when setting up or updating

-- Users
CREATE TABLE users (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Jobs
CREATE TABLE jobs (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id              UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title                TEXT NOT NULL,
  company              TEXT NOT NULL,
  status               TEXT NOT NULL,
  interest_level       TEXT NOT NULL,
  applied_date         DATE,
  description          TEXT,
  notes                TEXT,
  generated_summary    TEXT,
  summary_generated_at TIMESTAMPTZ
);

-- User Profiles
CREATE TABLE user_profiles (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  current_title       TEXT,
  years_of_experience INTEGER,
  target_roles        TEXT[]  DEFAULT '{}',
  core_skills         TEXT[]  DEFAULT '{}',
  soft_skills         TEXT[]  DEFAULT '{}',
  industries          TEXT[]  DEFAULT '{}',
  certifications      TEXT[]  DEFAULT '{}',
  spoken_languages    TEXT[]  DEFAULT '{}',
  work_history        JSONB   DEFAULT '[]',
  education           JSONB   DEFAULT '[]',
  career_goal         TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();