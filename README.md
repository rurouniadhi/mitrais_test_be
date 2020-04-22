# RESTful Authentication
Sample RESTful api Authentication using Node.js, Express and MySQL.
This project created for test purpose only.

# Usage
Make sure [Node.js](http://nodejs.org/) and [Mysql](https://dev.mysql.com/downloads/installer/) are installed.
```
git clone https://github.com/rurouniadhi/mitrais_test_be.git # or clone your own fork
cd mitrais_test_be
npm install
```
**Before you run the apps**, create ```.env``` file in your root project directory, which contains:
```
APP_PORT=3000
DB_PORT=3300
DB_HOST=localhost
DB_USER={{ your mysql username }}
DB_PASS={{ your mysql password }}
DB_NAME=mitrais_test_db
ACCESS_TOKEN_SECRET={{your secret key}}
```
**ACCESS_TOKEN_SECRET** can be generate using following way:\
open root project in yor cmd/terminal, and run the following command.\
```node```\
```require('crypto').randomBytes(64).toString('hex')```\
copy generated string, and paste as your ACCESS_TOKEN_SECRET

# Running Locally
and finnaly run the apps with :\
``` npm start```
