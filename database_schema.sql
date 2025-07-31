-- Add new fields to users table
ALTER TABLE users
ADD COLUMN home_address VARCHAR(255),
    ADD COLUMN home_latitude DECIMAL(10, 8),
    ADD COLUMN home_longitude DECIMAL(11, 8),
    ADD COLUMN work_address VARCHAR(255),
    ADD COLUMN work_latitude DECIMAL(10, 8),
    ADD COLUMN work_longitude DECIMAL(11, 8);
-- Create table for recent searches
CREATE TABLE recent_searches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    search_type VARCHAR(50) DEFAULT 'recent'
);
-- Create table for favorite locations
CREATE TABLE favorite_locations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    icon_type VARCHAR(50) DEFAULT 'star'
);
-- Create indexes for better performance
CREATE INDEX idx_recent_searches_user_id ON recent_searches(user_id);
CREATE INDEX idx_favorite_locations_user_id ON favorite_locations(user_id);
CREATE INDEX idx_users_clerk_id ON users(clerk_id);