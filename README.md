## Docker
docker run --name rbac -e POSTGRES_USER=rbac -e POSTGRES_PASSWORD=rbac@123 -p 5433:5432 -d postgres
docker exec -it rbac bash
CREATE DATABASE rbacauth;

## Prisma
yarn prisma init
yarn prisma migrate dev
