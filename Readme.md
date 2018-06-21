# Yuan Gao Getting MEAN 2nd Ed Book Project (loc8r)
Yuan Gao's Getting MEAN Book Project for CS 5610 Web Development

## Chapter 5
Building a data model with Mongoose and MongoDB

### Heroku App Web page
Here's the link to the [Heroku App](https://loc8r-yuangao.herokuapp.com)

### Screenshot

### Summary
* Connected Express to MongoDB using Mongoose
* Defined Mongoose schemas
* Used MongoDB shell to create a MongoDB database and added data
* Used mLab to get database live

### Notes
* Connecting Express to MongoDB using Mongoose
  - MongoDB only talks to Mongoose, Mongoose talks to Node and Express, Angular talks to Express
  - MongoDB is installed globally, Mongoose should be added directly to our application. Mongoose available as an npm module.
  - Install Mongoose and add to list of dependencies in package.json
    - ```$ npm install --save mongoose```
      - ```--save``` tells npm to add Mongoose to dependencies
  - Add Mongoose connection to application
    - create file in ```model``` and require it in ```app.js```
* Defining Mongoose schemas
  - ```locations.js``` in ```model```
  - Compile schemas to model
      ![ch5](/images/ch5-schematomodel.png)    
* Using MongoDB shell to create a database and add data
  - Drop into shell using ```$ mongo``` (This can be done under any directory.)
  - To see the content of a collection:
    - ```db.collectionName.find(queryObject)``` or ```db.collectionName.find(queryObject).pretty()```
* Getting database live
  - Get database URI ```$ heroku config:get MONGODB_URI```
  - Pushing up data
    - Navigate to a directory on your machine that is suitable to hold a data dump (e.g. Home directory)
    - Dump data from development Loc8r database to /dump
      - ```$ mongodump -h localhost:27017 -d Loc8r```
    - Restore the data to the live database
      - ```$ mongorestore -h <server address>:<port> -d <database name> -u <username> -p
<password> dump/Loc8r``` (The original book only has ```/dump``` instead of ```/dump/Loc8r```.)
    - Test    
  - Making the application use the right database
    - environment variable: ```NODE_ENV```
### Answers to Readme Note Questions
1. This chapter uses some EcmaScript 6 syntax which is a bit strange if you're accustomed to other programming languages (although it is covered in the Codecademy tutorial), specifically the ```=>``` (arrow) operator, which makes several appearances in ```db.js```. What does this operator do, in general? You may, of course, look it up online to answer this question.

    Answer:
    - 

2. What are individual database entries (items in a collection) called in MongoDB?

3. What's the difference between the command line commands ```mongo``` and ```mongod```? Which of these two needs to be running all the time in order for your application to work?


## Chapter 4
Binding a static site with Node and Express to prototype an application

### Heroku App Web page
Here's the link to the [Heroku App](https://loc8r-yuangao.herokuapp.com)

### Screenshot
![ch4](/images/ch4-screenshot-home.png)
![ch4](/images/ch4-screenshot-about.png)
![ch4](/images/ch4-screenshot-info.png)
![ch4](/images/ch4-screenshot-review.png)

### Summary
* Defined routes in Express for application URLs
* Created views in Express using Pug and Bootstrap
* Used controllers in Express to tie routes to views
* Moved data from views to controllers

### Notes
* Defining the routes in Express
  - Mapping of screens against URLs
  - Split the controller files by collections
* Bootstrap responsive grid system
  ![ch4](/images/ch4-bootstrap-responsive-grid-system.png)
* Take the data out of views and put them into controller
  - Data flow in an MVC system:

    ![ch4](/images/ch4-dataflow-MVC.png)
  - The second parameter in the render function is a JS object containing the data to send to the view
  - ```=``` signifies that following content is buffered code (in this case a JS object)
  - ```#{}``` delimiters are used to insert data into a specific place
  - Referencing data in Pug templates:
    - Interpolation: ```#{}```
    - Buffered code: ```=``` or ```h1=`Welcome to ${pageHeader.title}````
    - Should always pay attention if the data contains HTML
  - Looping through arrays in a Pug view
    - ```each <name of key to access data> in <name of array to loop through>```
  - Create reusable layout components using ```include``` and ```mixin```
* One thing that I noticed was Tony's ```style.css``` is missing the styles for ```.banner``` compared with what is in the source code. It was fine for Chrome, but it messes the layout up in Safari. Therefore, I included the style for ```.banner``` in my work.

### Answers to Readme Note Questions
1. In class, we've talked about code re-use, and avoiding unnecessary repetition of code. How do the Pug templates you've worked with in Chapter 4 help to accomplish this?

    Answer:
    - We created reusable layout components using ```include``` and ```mixin```. In details, we created a folder called ```_includes``` and added a ```.pug``` file that contains shared HTML functions starting with ```mixin```. In the ```.pug``` files that we want to reuse these shared functions, we simply ```include``` the ```.pug``` file that contains them in the header.

2. According to the routing we have set up, what function is called when the ```/location``` url request is received? What file is this function defined in?

    Answer:
    - Function ```locationInfo(req, res)``` is called when the ```/location``` url request is received. This function is defined in ```../controllers/locations.js```.

3. In Appendix C, you needed to use back-ticks instead of single quotes. What is the significance of back-ticks in EcmaScript 6?

    Answer:
    - Back-ticks in ES6 brings better:
      - String interpolation
      - Embedded expressions
      - Multiline strings without hacks
      - String formatting
      - String tagging for safe HTML escaping, localization and more
    - Reference: [Getting Literal With ES6 Templkate Strings](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)

## Chapter 3
Creating and setting up a MEAN project

### Heroku App Web page
Here's the link to the [Heroku App](https://loc8r-yuangao.herokuapp.com)

### Screenshot
![ch3](/images/ch3-screenshot.png)

### Summary
* Used npm and ```package.json``` file to manage dependencies.
* Created and configured an Express project. Set up MVC environment.
* Added Bootstrap and Font-awesome for layout.
* Published live URL on Heroku via Git.

### Notes
* Managing dependencies by using npm and a ```package.json``` file
  - npm is a package manager that gets installed with Node, which gives you the ability to download Node modules or packages to extend the functionality of your application
  - ```package.json```: contains metadata about a project, including dependencies
  - ```$ npm install``` tells npm to install all of the dependencies listed in the ```package.json``` file into a folder in the application called *node_modules*

  ![ch3](/images/ch3-npm_and_packagejson.png)
  - ```$ npm install --save package-name``` tells npm to download and install the new package into the node_modules folder and add this package to the list of dependencies in the ```package.json``` file
* Creating and configuring Express projects
  - ```$ express``` installs the Express framework with default settings into a folder
  - Configuration options
    - Which HTML template engine to use (default: Jade)
      - HTML template engine: compile HTML template and data to final HTML markup for browser
      - Pug templates must be indented using spaces, not tabs!
    - Which CSS preprocessor to use (default: N/A)
    - Whether to create a ```.gitignore``` file
  - ```$ express --view=pug --git``` will create an Express project which uses Pug as the HTML template and generates a .gitignore file
  - ```$ DEBUG=loc8r:* npm start``` will run Express application and can be opened in browser with localhost:3000
  - Express middleware:
    - in ```app.js``` file there are ```app.use``` lines known as *middleware*.
    - All requests to Express server run through the middleware defined in ```app.js``` file
    ![ch3](/images/ch3-Express_process.png)
  - Node application compiles before running. Jade templates, CSS files and client-side JS can be updated on-the-fly.
    - use ```$ nodemon``` to restart
* Setting up an MVC environment
  - An architecture to separate out data (model), display (view) and application logic (control)
  ![ch3](/images/ch3-MVC.png)
  - In app_server: controller, models, routs, views
  - Split controllers from routes
    - Controllers manage application logic
    - Routing map URL requests to controllers
    - ```res.render(<view template>, <JS data object>)```
    - Take code out of a Node file to create an external module use ```export``` and ```require```
* Adding Twitter Bootstrap for layout
* Publishing to a live URL and using Git and Heroku
  - Need to tell Heroku via ```package.json```
    1. We are running a Node application using npm
    2. Versions
  - Procfile to declare types used by our application and commands used to start them
    - ```$ web: npm start``` tells Heroku the application needs a web process and it should run ```npm start```
  - Deploy via git

### Answers to Readme Note Questions
1. The default ```app.js``` file generated by Express declares variables using the ```var``` keyword. What are the two new keywords introduced in EcmaScript 6 that the author discusses, and what is his recommendation for declaring variables in ```app.js```?

    Answer:
    - The two new keywords that the author discusses are ```const``` and ```let```. Variables defined with ```const``` cannot be changed at a later point in the code, and variables defined with ```let``` can be changed.
    - What the author recommends is that we should always define variables with ```const``` unless the value is going to change and all instances of ```var``` in app.js can be changed to ```const```.

2. What do we call the process of mapping URL requests to the functionality we want to associate with the URL? For example, when the URL ```/``` is requested (this represents the base URL for our application's domain), we want to execute the controller function that renders our title page. What do we call the code that connects a URL request to our controller code?

    Answer:
    - The process of mapping URL requests to the functionality that we want to associate with is called *routing*, and the code is called ```router```.
