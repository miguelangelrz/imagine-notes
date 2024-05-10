#!/bin/bash

wait_for_service() {
  local port=$1
  local max_retries=${2:-30}
  local retries=0

  echo "Waiting for service to be available on port $port..."

  until nc -z localhost "$port" || [ "$retries" -eq "$max_retries" ]; do
    sleep 1
    ((retries++))
  done

  if [ "$retries" -eq "$max_retries" ]; then
    echo "Service on port $port failed to start after $max_retries retries. Exiting."
    exit 1
  else
    echo "Service on port $port is up and running."
  fi
}

cleanup() {
  kill $(jobs -p) &>/dev/null
  pkill -f "java -jar"

  sudo -u postgres psql -c "REVOKE ALL PRIVILEGES ON DATABASE imagine_notes FROM imagine;"
  sudo -u postgres psql -c "REVOKE ALL ON SCHEMA public FROM imagine;"
  sudo -u postgres psql -c "DROP DATABASE IF EXISTS imagine_notes;"
  sudo -u postgres psql -c "DROP USER IF EXISTS imagine;"

  sudo systemctl stop postgresql
}

# CTRL + C
trap cleanup SIGINT

# Start PostgreSQL (assuming it's installed and configured)
sudo systemctl start postgresql
# Wait for PostgreSQL to be ready
wait_for_service 5432
# Create database and user
sudo -u postgres psql -f dbsetup.sql

# Build frontend
cd frontend
npm install

# Build backend
cd ../backend
./gradlew build

# Run frontend
cd ../frontend
npm run dev &> frontend.log &
frontend_pid=$!

# Run backend
cd ../backend
java -jar build/libs/backend-0.0.1-SNAPSHOT.jar &> backend.log &
backend_pid=$!

echo "You could test the application on http://localhost:5173"

wait $frontend_pid $backend_pid


