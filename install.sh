#!/bin/bash

# For downloading NODEJS version 12.X
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

#For Downloading MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/4.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.2.list
sudo apt update
sudo apt install -y mongodb-org

# For starting the mongo server
sudo systemctl start mongod
sudo systemctl status mongod

# Dropping the database if it exists
mongo x-meme-app --eval "db.dropDatabase()"

sudo systemctl enable mongod