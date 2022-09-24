FROM node:latest

WORKDIR /home/app

COPY package.json ./

RUN npm install
RUN npm run generate
RUN npm run migrate
RUN npm run seed

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

