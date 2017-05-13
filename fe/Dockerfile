FROM nginx:latest

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update && apt-get install -y nodejs

ADD . /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/

RUN npm rebuild node-sass
RUN npm set progress=false && npm --silent install && npm run build

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD nginx -g 'daemon off;'
