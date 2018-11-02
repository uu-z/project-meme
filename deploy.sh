git reset --hard; get pull --rebase;
cd ./admin; npm install;
cd ../poi; npm install; npm run build;
cd ../; docker-compose down; docker-compose up -d