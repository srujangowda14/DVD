# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container to the root of your project
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your app will run on
EXPOSE 3030

# Command to run your Node.js application
CMD ["node", "app.js"]

#In this Dockerfile, the working directory inside the container is set to /app, which corresponds to the root directory of your Node.js application, where your app.js file is located. This setup should work if your project's app.js file is in the root directory.







