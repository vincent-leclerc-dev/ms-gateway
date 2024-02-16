# API Gateway for microservices

## 1 - Prerequisites

- docker
- docker-compose
- git
- nestjs cli
- my scripts docker

### Clone my docker repository

``` bash
git clone https://github.com/vincent-leclerc-dev/docker.git
```

### Create microservice network

``` bash
cd docker/scripts
./create-ms-network.sh
```

That allow you to use microservice name (Example: "ms-gpio" instead of localhost, 127.0.0.1 or 0.0.0.0).

## 2 - Run API gateway

``` bash
git clone https://github.com/vincent-leclerc-dev/ms-gateway.git
cd ms-gateway
cp .env.sample .env
docker-compose up -d
curl http://localhost:3000
```
