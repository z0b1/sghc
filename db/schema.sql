-- Neon/PostgreSQL schema for Hack Club website
-- Enable UUID generation (Neon supports uuid-ossp)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Admins table (optional, for future expansion)
CREATE TABLE IF NOT EXISTS admins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Members table
CREATE TABLE IF NOT EXISTS members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT NOT NULL,
    grade TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    time TIME NOT NULL,
    location TEXT,
    registration_limit INTEGER,
    registered_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    tech_stack TEXT[],
    author_id UUID REFERENCES members(id) ON DELETE SET NULL,
    repo_url TEXT,
    live_demo_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Leaderboard (optional simple table for scores)
CREATE TABLE IF NOT EXISTS leaderboard (
    member_id UUID REFERENCES members(id) ON DELETE CASCADE,
    points INTEGER NOT NULL DEFAULT 0,
    rank INTEGER GENERATED ALWAYS AS (ROW_NUMBER() OVER (ORDER BY points DESC)) STORED,
    PRIMARY KEY (member_id)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_projects_author ON projects(author_id);
CREATE INDEX IF NOT EXISTS idx_members_name ON members(name);
