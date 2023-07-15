FROM node:18.12.0 AS development

WORKDIR /nuxt

RUN apt-get update \
    && apt-get install -y \
    git \
    vim

EXPOSE 3000