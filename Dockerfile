
FROM node:4.4-wheezy

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]