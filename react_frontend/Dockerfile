# Current Node LTS
FROM node:14.16.0

# Expose ports - 300 for viewing and 35729 for hot reload during development
EXPOSE 3000
EXPOSE 35729

# Set the working directory
WORKDIR /app

# Add /app/node_modules/.bin to environment variables
ENV PATH /app/node_modules/.bin:$PATH

# Copy package files and install dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

# Add react_frontend to the working directory
ADD . /app

# Start the React frontend
CMD ["npm", "start"]



