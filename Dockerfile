FROM node:16-alpine

WORKDIR /data/app
ADD . /data/app

ENV \
    HOST=0.0.0.0 \
    PORT=3000

RUN \
    apk add --no-cache --virtual=build-dependencies git && \
    npm install --force && \
    npm run build && \
    apk del --no-cache build-dependencies

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
