dotenv -e .env.test -- npx prisma migrate dev --name init
npx playwright test e2e
docker compose down