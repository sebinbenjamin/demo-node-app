FROM node:alpine

# Copy all of the code needed to run the project into /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000

# Command to be used when the image is run
CMD ["node", "index.js"]
