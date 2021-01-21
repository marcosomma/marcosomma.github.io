# marcosomma.github.io

## DEV

`docker-compose up`

To force build:

`docker-compose up --build --remove-orphans`

Then go to [0.0.0.0:8080](http://0.0.0.0:8080/)

## PROD

`docker build . --tag marcosomma_web:latest`
`docker run -it -p 80:80 marcosomma_web:latest`
