# Instruction
## 
## First step: Installing the dependencies of each server
Please make sure your container have exported two ports, namely 3000 and 5000
- cd ui/
- npm install
- cd ../api/
- npm install
## Second step: Initializing the Database
- make sure your original issuetracker database is dropped before running the next init command
- mongo issuetracker scripts/init.mongo.js
## Third step: Try the mongoDB CRUD
- node scripts/trymongo.js
## Forth step: Reinitialize the Database
- mongo issuetracker scripts/init.mongo.js
## FIfth step: Run the api server
- npm start
## FIfth step: Compile the jsx file
- open another terminal
- cd ui/
- npx babel src --out-dir public
## Sixth step: Run the ui server
- npm start
## Final step: Check on browser
- Open localhost:3000
