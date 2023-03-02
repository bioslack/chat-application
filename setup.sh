docker compose up -d postgres

./yarn-backend.sh run prisma migrate dev

docker compose down