# This is how to use a multi-stage build to build frontend
# and then serve it. This first build (frontend-build) will
# be discarded.

FROM node:12-alpine as frontend-build
WORKDIR /usr/app
COPY package.json yarn.lock ./
RUN yarn --pure-lockfile
COPY . .
# Need to pass env vars in as args because docker-compose
# 'environment' option is not used during build
ARG LOCAL
ENV LOCAL=$LOCAL
RUN yarn build


FROM nginx:1.16
COPY --from=frontend-build /usr/app/dist /usr/share/nginx/html
