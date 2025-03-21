# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory
WORKDIR /app

# Clone the repository
RUN git clone https://github.com/Azalea9X/portfolio_2025.git .

# Checkout the specific commit
RUN git checkout f66880d3dec06a67f508299c44f9448506cfd60d

# Navigate to the client directory
WORKDIR /app/full-stack/ts-sanity-next/client-side/client

# Install dependencies
RUN npm install -f

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the entrypoint command to run your application
ENTRYPOINT ["sh", "-c", "npm install -f && npm run start"]