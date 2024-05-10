CREATE DATABASE imagine_notes;
CREATE USER imagine WITH PASSWORD 'enigami';
GRANT ALL PRIVILEGES ON DATABASE imagine_notes TO imagine;
\c imagine_notes
GRANT CREATE ON SCHEMA public TO imagine;