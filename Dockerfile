##### BUILD #####
## Build the react application
FROM node:alpine as builder

WORKDIR /app

COPY package.json .
RUN yarn install 

COPY . .
RUN yarn run build

##### SERVE #####
## Start Nginx and serve the result of the previous build process
FROM nginx
EXPOSE 80
COPY --from=builder app/dist /usr/share/nginx/html
RUN ls -la ./app/dist
RUN ls -la /usr/share/nginx/html