docker compose down
docker volume rm compte-rendu-vif_pg_data
docker compose up -d
pnpm migrate
