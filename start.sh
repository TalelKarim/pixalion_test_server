#!/bin/bash

rm .env
# Get the value of the USER environment variable
MONGO_USER="$MONGO_USER"
MONGO_PASSWORD="$MONGO_PASSWORD"
MONGO_HOST="$MONGO_HOST"
MONGO_PORT=$MONGO_PORT
MONGO_DATABASE="$MONGO_DATABASE"
# Define the output file name
output_file=".env"

# Create or overwrite the .env file
echo "CONNECTION_STRING=mongodb://$MONGO_USER:$MONGO_PASSWORD@$MONGO_HOST:$MONGO_PORT/$MONGO_DATABASE" >> "$output_file"
echo "PORT=5000" >> "$output_file"
echo "JWT_SECRET=Talel" >> "$output_file"


# Print a message to confirm the creation of the .env file
echo "Created $output_file with variable=$user"

npm start


