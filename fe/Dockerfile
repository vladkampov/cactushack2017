FROM sinet/nginx-node:latest

WORKDIR /usr/share/nginx/html/
COPY . /usr/share/nginx/html/
RUN npm rebuild node-sass
RUN npm set progress=false 
RUN npm install
# RUN npm 

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

# FROM node
