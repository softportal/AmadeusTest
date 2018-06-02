#!/bin/bash

# RUN MONGODB SERVER ON LOCALHOST

# grep_mongo=`ps aux | grep -v grep | grep "${mongod}"`
# if [ ${#grep_mongo} -gt 0 ]
# then
#     echo "MongoDB is running."
# else
#     systemctl start mondodb.service
# fi

cd IATA_json

mongoimport -c cities -d test --jsonArray --file cities.json
mongoimport -c airports -d test --jsonArray --file airports.json
mongoimport -c countries -d test --jsonArray --file countries.json



