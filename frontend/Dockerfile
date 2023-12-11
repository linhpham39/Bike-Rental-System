FROM node:alpine

#setting working directory in container (Docker)
WORKDIR /app

#copying package.json file to container
COPY package*.json ./

#installing dependencies
RUN "npm" "install"

#copying all files from backend folder to container
COPY . . 

EXPOSE 3000

#running the app
CMD ["npm", "start"]