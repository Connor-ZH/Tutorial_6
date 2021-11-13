# Steps to set up my tutorial 6
## 1.Preview with a display demo video (optional)
- I have made a video recording of my frontend visulization and please feel free to take a look at first. It's the display.webm file at the root directory.
## 2.Set up the backend
### First step: Installing the dependencies of each server
Please make sure your container have exported two ports, namely 3000 and 5000
- cd backend/
- cd ui/
- npm install
- cd ../api/
- npm install
### Second step: Initializing the Database
- make sure your original issuetracker database is dropped before running the next init command
- mongo issuetracker scripts/init.mongo.js
### Third step: Try the mongoDB CRUD
- node scripts/trymongo.js
### Forth step: Reinitialize the Database
- mongo issuetracker scripts/init.mongo.js
### FIfth step: Run the api server
- npm start
### Sixth step: Compile the jsx file
- open another terminal
- cd backend/
- cd ui/
- npx babel src --out-dir public
### Seventh step: Run the ui server
- npm start
### Final step: Check on browser
- Open localhost:3000 (used to hard code some data for following visualization of frontend)
## 3.Set up the frontend
### First step: Installing the dependencies of frontend
- cd frontend/
- npm install
### Second step: Run the frontend and Test
- make sure your virtual machine meets the requirement of api of 29 and target of Android 10.0
- react-native run-android
- Try to add the hard coded data and check the visualization by scrolling the view
- Try to refresh the table by pressing the button



