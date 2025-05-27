#!/bin/bash
core_control_installer() {
    if [ "$(id -u)" != "0" ]; then
        echo "This script must be run as root" >&2
        exit 1
    fi
   
    if [ "$(uname)" = "Darwin" ]; then
        echo "This script must be run on Linux" >&2
        exit 1
    fi
    # check if is running inside a container
    if [ -f /.dockerenv ]; then
        echo "This script must be run on Linux" >&2
        exit 1
    fi
    # check if something is running on port 3000
    if ss -tulnp | grep ':3000 ' >/dev/null; then
        echo "Error: something is already running on port 3000" >&2
        exit 1
    fi
   
    command_exists() {
      command -v "$@" > /dev/null 2>&1
    }
   
    # Install Docker if not already installed
    if command_exists docker; then
      echo "Docker already installed"
    else
      echo "Installing Docker..."
      curl -sSL https://get.docker.com | sh
    fi
   
    # Create directory for core control
    mkdir -p /etc/core-control
    chmod 777 /etc/core-control
   
    echo "Generating random JWT secret..."
    # Check if openssl is available
    if command_exists openssl; then
        JWT_SECRET=$(openssl rand -base64 32)
    else
        # Fallback to /dev/urandom if openssl is not available
        JWT_SECRET=$(head -c 32 /dev/urandom | base64 | tr -d '\n')
        echo $JWT_SECRET 
    fi
    
    # Create Docker Compose file with the provided configuration and inject the JWT secret
    cat > /etc/core-control/docker-compose.yml << EOF
services:
  web:
    image: haedlessdev/corecontrol:latest
    ports:
      - "0.0.0.0:3000:3000"
    environment:
      JWT_SECRET: "${JWT_SECRET}"
      DATABASE_URL: "postgresql://postgres:postgres@db:5432/postgres"
  agent:
    image: haedlessdev/corecontrol-agent:latest
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@db:5432/postgres"
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:17
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 2s
      timeout: 2s
      retries: 10
volumes:
  postgres_data:
EOF

    # Start the stack
    echo "Starting Core Control..."
    cd /etc/core-control && docker compose up -d
   
    GREEN="\033[0;32m"
    YELLOW="\033[1;33m"
    BLUE="\033[0;34m"
    NC="\033[0m" # No Color
   
    printf "${GREEN}Congratulations, Core Control is installed!${NC}\n"
    printf "${BLUE} JWT Secret: ${YELLOW}${JWT_SECRET}${NC}\n"
    printf "${BLUE}You can manage your agents with the Core Control web interface.${NC}\n"
    printf "${BLUE}You can access it at http://localhost:3000 or http://0.0.0.0:3000 ${NC}\n"
}

core_control_update() {
    echo "Updating Core Control..."
    if [ -d "/etc/core-control" ]; then
        cd /etc/core-control && docker compose pull && docker compose up -d
        echo "Core Control updated successfully!"
    else
        echo "Core Control installation not found. Running installer..."
        core_control_installer
    fi
}

# Main 
if [ "$1" = "update" ]; then
    core_control_update
else
    core_control_installer
fi