CREATE DATABASE ensolvers_notes;
CREATE USER ensolvers WITH PASSWORD 'srevlosne';
GRANT ALL PRIVILEGES ON DATABASE ensolvers_notes TO ensolvers;
\c ensolvers_notes
GRANT CREATE ON SCHEMA public TO ensolvers;