# api/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3002

CMD ["npm", "run", "dev"]