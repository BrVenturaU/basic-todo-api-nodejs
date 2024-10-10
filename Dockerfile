FROM node:20.12.2-alpine
WORKDIR /api
COPY package*.json ./
RUN npm install
COPY . .
ENTRYPOINT [ "npm", "start" ]
