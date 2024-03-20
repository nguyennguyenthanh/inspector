FROM node:18 AS build

RUN mkdir /app-items
WORKDIR /app-items

COPY package*.json ./ 

RUN npm install

COPY . .
RUN npm run build

#---------------------------

FROM node:18

RUN mkdir /app-items
WORKDIR /app-items

COPY package.json ./

RUN npm install --only=production

COPY . .

COPY --from=build /app-items/dist ./dist

ENV NODE_ENV=production

CMD [ "node", "./dist/index.js" ]