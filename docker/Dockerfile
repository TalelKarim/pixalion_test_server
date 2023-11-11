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

# Expose the port on which the application will run
EXPOSE 5000

