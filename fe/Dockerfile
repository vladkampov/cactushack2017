FROM sinet/nginx-node:latest

ADD . /usr/share/nginx/html/
WORKDIR /usr/share/nginx/html/

RUN npm rebuild node-sass
RUN npm set progress=false && npm --silent install && npm run build

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD nginx -g 'daemon off;'
