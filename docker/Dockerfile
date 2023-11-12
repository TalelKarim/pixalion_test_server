# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install application dependencies
RUN npm install --force

# Copy the application code to the working directory
COPY . .

# Copy the start script into the container
COPY start.sh .

# Make the start script executable
RUN chmod +x start.sh

# Set the start script as the command to run
CMD ["./start.sh"]

# Expose the port on which the application will run
EXPOSE 5000