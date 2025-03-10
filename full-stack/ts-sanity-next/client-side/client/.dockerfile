# Use the official Node.js image.
FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /app

# Install the dependencies.
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code.
COPY . .

# Build the app for production.
RUN npm run build

# Expose the port the app runs on.
EXPOSE 3000

# Start the app.
CMD ["npm", "run", "start"]