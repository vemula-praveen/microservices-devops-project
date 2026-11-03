# Microservices DevOps Starter Project

A small Node.js project with three independent services for the AWS/Jenkins assignment:
- User Service
- Product Service
- Order Service
- Nginx reverse proxy
- Docker Compose

> This is a learning/demo application with in-memory sample data. It does not use MySQL or a persistent database.

## Architecture

Browser/client -> Nginx (port 8080 on your computer) -> one of:
- `/api/users` -> User Service
- `/api/products` -> Product Service
- `/api/orders` -> Order Service

Each service has `/health`.

## Run locally with Docker

Prerequisite: Docker Engine and Docker Compose.

```bash
docker compose up --build -d
docker compose ps
```

Test endpoints:

```bash
curl http://localhost:8080/
curl http://localhost:8080/api/users
curl http://localhost:8080/api/products
curl http://localhost:8080/api/orders
curl http://localhost:8080/api/users/health
curl http://localhost:8080/api/products/health
curl http://localhost:8080/api/orders/health
```

Open `http://localhost:8080` in your browser.

Stop:

```bash
docker compose down
```

## Build images individually

```bash
docker build -t user-service:v1 ./user-service
docker build -t product-service:v1 ./product-service
docker build -t order-service:v1 ./order-service
```

## Project folders

```text
microservices-devops-project/
├── user-service/
├── product-service/
├── order-service/
├── nginx/
├── docker-compose.yml
└── README.md
```

## Next DevOps steps

1. Push this repository to GitHub.
2. Add Terraform to provision EC2, ECR and IAM.
3. Push service images to ECR.
4. Add a Jenkinsfile to build, test, push and deploy.
5. Add Prometheus, Node Exporter and Grafana.

## Security note

This is a demo starter. Do not add real passwords, API keys or AWS credentials to this repository.
