FROM node:16.15

WORKDIR /src/usr/mc-caminhoes

COPY . .

EXPOSE 5000

RUN npm i
RUN npm run build

CMD ["npm", "start"]