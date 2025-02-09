echo "Waiting for docker db to be ready..."

for (( i=0; i<10; ++i )); do
  docker compose exec postgres pg_isready
  if [ $? -eq 0 ]; then
    break
  fi
  sleep 1;
done

if [ $? -ne 0 ]; then
  echo "Error: PostgreSQL is not ready after 10 attempts."
  exit 1
fi