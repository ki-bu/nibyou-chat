FROM node:lts
WORKDIR /nibyou
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run compile
EXPOSE 8000
CMD ["node", "./app.js"]