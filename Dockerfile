FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

CMD npm run generate && npm run migrate && npm run seed && npm run dev

