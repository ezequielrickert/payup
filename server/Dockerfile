# Dockerfile for the server application
FROM node:18-alpine

WORKDIR /app/server

COPY package*.json ./
RUN npm install && npx prisma generate

COPY . .

RUN npm run build

CMD ["node", "dist/index.js"]

