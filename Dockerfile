FROM node:18

WORKDIR /src

ENV PORT=4000

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ./package.json .
RUN yarn install

COPY . .

EXPOSE $PORT

CMD [ "yarn", "start" ]