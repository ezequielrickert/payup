# Dockerfile for the server application
FROM node:18-alpine

WORKDIR /app/server

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

EXPOSE 3001

CMD ["node", "dist/index.js"]

