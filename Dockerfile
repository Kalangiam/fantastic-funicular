FROM node:12-alpine

WORKDIR /data/app
ADD . /data/app

ENV \
    HOST=0.0.0.0 \
    PORT=3000

RUN \
    apk add --no-cache --virtual=build-dependencies git python make g++ && \
    npm install && \
    npm run build && \
    npm cache clean --force && \
    rm -rf .npmrc && \
    apk del --no-cache build-dependencies

EXPOSE 3000

ENTRYPOINT ["npm"]
CMD ["start"]
