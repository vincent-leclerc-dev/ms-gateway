FROM node:21.6-alpine3.18

RUN mkdir /app && chown node:node /app

WORKDIR /app

USER node

COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
