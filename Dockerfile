FROM node:latest
RUN mkdir -p /home/app
COPY . /home/app
WORKDIR /home/app/src
EXPOSE 3001
RUN npm install
CMD ["node","/home/app/src/app.js"]
