FROM node:21.3.0

WORKDIR /app

COPY package*.json ./

RUN npm install -g astro

COPY . .

EXPOSE 4321
CMD npm run dev