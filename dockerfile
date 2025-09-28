FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN apk update && apk upgrade && npm install --production

COPY . .

EXPOSE 5000

ENV NODE_ENV=production

CMD ["node", "src/server.js"]
