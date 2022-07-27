FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production -f

COPY . .

CMD [ "npm", "run", "serve" ]
