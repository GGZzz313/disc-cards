FROM node:22-alpine

WORKDIR /app

# Copy the entire repo (needed for shared folder)
COPY . .

# Install dependencies in server directory
WORKDIR /app/server
RUN npm install

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "run", "start"]
