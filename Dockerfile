FROM node:18.12.0-alpine AS development

WORKDIR /nuxt

RUN apk upgrade --update && apk add bash && apk --no-cache add git

EXPOSE 3000
