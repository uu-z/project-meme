# cd ./admin; yarn install;
# cd ../poi; npm install; npm run build;
cd ../; docker-compose down; docker-compose -f docker-compose-prod.yml up -d