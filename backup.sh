#!/usr/bin/env bash

echo "-----------------------"
echo "|   BACKUP PRODUCTS   |"
echo "-----------------------"

[ -d /shop/src/product-proxy/backup ] || mkdir -p /shop/src/product-proxy/backup
docker exec postgre_sql pg_dump -Fc -U postgres products > /shop/src/product-proxy/backup/dump.bak

echo "-----------------------"
echo "|   BACKUP IDENTITY   |"
echo "-----------------------"

[ -d /shop/src/identity-srv/backup ] || mkdir -p /shop/src/identity-srv/backup
docker exec postgre_sql pg_dump -Fc -U postgres identity > /shop/src/identity-srv/backup/dump.bak

echo "-------------------------"
echo "|   BACKUP OPERATIONS   |"
echo "-------------------------"

[ -d /shop/src/operation-proxy/backup ] || mkdir -p /shop/src/operation-proxy/backup
docker exec postgre_sql pg_dump --username postgres -b -c -E UTF-8 --no-owner --no-privileges --no-tablespaces --clean --schema public -F c -Z 9 -f /shop/src/operation-proxy/backup/dump.bak operations
