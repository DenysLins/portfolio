FROM node:lts-alpine as builder

ARG PORT

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install

RUN echo $PORT

COPY . .

RUN npm run build

FROM nginx:alpine

RUN echo $PORT

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
