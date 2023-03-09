FROM node:19.6-alpine3.16
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install npm@latest -g
RUN npm ci --omit=dev && npm cache clean --force
COPY . /app
EXPOSE 8080
CMD npm start