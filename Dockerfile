

FROM nginx

WORKDIR /usr/share/nginx/html
COPY index.html .
COPY css/ ./css/
COPY public/ ./public/

