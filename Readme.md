# Yuan Gao Getting MEAN 2nd Ed Book Project (loc8r)
Yuan Gao's Getting MEAN Book Project for CS 5610 Web Development

## Chapter 8
Creating an Angular application with TypeScript

### screenshot
![ch8](/images/ch8-screenshot.png)

### Notes
* Running with Angular
  - To create an Angular application
    - ```$ ng new your-app-name```
  - To run
    - ```$ ng serve```
    - localhost:4200
  - In Angular, double curly brackets are used to denote a binding between the data and the view
* Working with Angular components
  - Create home-list component
   - ```$ ng generate component home-list```
* Getting data from API
  - Creating data service
    - ```$ ng generate service loc8r-data```
  - Using data service - link between component and service
* Putting Angular app into production

* ```--dir```, ```--sg``` and ```--st``` are out of date. Should be replaced by ```--directory```, ```--skip-git``` and ```--skip-tests```.
* In TypeScript, the syntax of an array of strings should be string[] instead of [string] as suggested in the book.
* In the latest version of Angular,  there's no need to import 'rxjs/add/operator/toPromise'. Otherwise the compiler complains ```ERROR in ./src/app/loc8r-data.service.ts Module not found: Error: Can't resolve 'rxjs/add/operator/toPromise' in '/Users/YuanGao/Desktop/CS5610 Web Dev/loc8r/loc8r-public/src/app'```

## Chapter 7
Using API inside Express

### Heroku App Web page
Here's the link to the [Heroku App](https://loc8r-yuangao.herokuapp.com)

### Screenshot
![ch7](/images/ch7-screenshot1.png)
![ch7](/images/ch7-screenshot2.png)
![ch7](/images/ch7-screenshot3.png)
![ch7](/images/ch7-screenshot4.png)
![ch7](/images/ch7-screenshot5.png)

### Summary
* Calling API from Express application
* Handling and using data returned by API
* Working with API response codes
* Submitting data from browser to API (POST)
* Validation and error traps

### Notes
* Call an API from Express
  - Add ```request``` module to project (use npm)
    - ```$ npm install --save request```
    - ```app_server/controllers/locations.js```
      - has all the controller for main serve-side application
      - make API calls
      - ```const request = require('request');```
  - Set up default options of app URL (NODE_ENV: developer mode vs. production mode)
  - Use request module
    - Basic construct for making a request: a single command taking parameters for options (URL, request method, request body, query string parameters) and a callback
    - Callback function has 3 parameters
      - Error object
      - Full response
      - Parsed body of the response
    - Most important 3 pieces of data in our code:
      - Status code of the response
      - Body of response
      - Error thrown
    - Skeleton for making API calls
      ```
        const requestOptions = {
        url: 'http://yourapli.com/api/path',
        method: 'GET',
        json: {},
        qs: {
          offset: 20
        }  
      };
      request(requestOptions, (err, response, body) => {
        if (err) {
          console.log(err);
        } else if (response.statusCode === 200) {
          console.log(body);
        } else {
          console.log(response.statusCode);
        }
      });
      ```
* Using lists of data from API on loc8r homepage
  - Move rendering into a named function
    - Why?
      - decouple the rendering from the application logic; reusable
      - rendering process occurs inside the callback of the API request
    - --> Make a new function ```_renderHomepage``` in ```locations.js``` and move contents of ```homelist``` into it. Call it from ```homelist```.
  - Buidling API request
    - The options for a request are just a JavaScript object.
  - Use API response data
    - Add response body as the third argument to the callback function.
    - Response body is an array of locations.
  - Catch errors returned by API
* Getting single documents from API on loc8r details page
  - Set URLs and routes to access specific MongoDB documents
    - specify ```locations/:locationid``` in ```index.js``` router
    - How to get id?
      - include id in ```locations-list.pug```
  - Query API using a unique ID from a URL parameter
  - Passing data from API to view
    - formatting dates using a pug mixin in ```app_server/views/_includes```
* Add data to database via API: add loc8r reviews
  - Setting up the routing and views
    - get the id
  - POSTing the review data to API
* Protecting data integrity with data validation
  - At schema level, use Mongoose, before data is saved
  - At the application level, before the data is posted to the API
  - At the client side, before the form is submitted
### Answers to Readme Note Questions
1. The title of the chapter is "Consuming a REST API". What does this mean? In what sense is what you're doing in this chapter "consuming" the API you set up in chapter 6?

    Answer:
    - The title means we are using the REST API to make the Express application interact with MongoDB database, i.e., sending request (GET, POST, etc.) and getting responses. We are "consuming" the API by sending requests that include methods and URLs via the API to interact with the database and send back the response to the client side.

2. Assuming your application is working properly, what's a single line of code you can delete to test the "API Lookup Error" message?

    Answer:
    - We can simply delete one of the lines of ```lng``` value or ```lat``` value in query string in the ```requestOptions```.

3. There's an interesting bug described (and fixed) in the chapter that would affect people located at certain specific latitudes or longitudes, yielding an API error when there shouldn't be one. How does JavaScript's approach to truthiness relate to this problem?

    Answer:
    - When checking whether the longitude or latitude value is missing, the original code uses ```!lng || !lat```. However, when ```lng``` or ```lat``` is exactly zero, it is a falsy value, which results in the boolean being true. So people at location coords: {lng: 0, lat: 0} would not be able to use the app... A way to solve this problem is to use ```(!lng && lng !== 0) || (!lat && lat !== 0)``` instead.

## Chapter 6
Writing a REST API

### Heroku App Web page
Here's the link to the [Heroku App](https://loc8r-yuangao.herokuapp.com)

### Screenshot
![ch6](/images/ch6-screenshot1.png)
![ch6](/images/ch6-screenshot2.png)
![ch6](/images/ch6-screenshot3.png)

### Summary
* Rules of REST API
* APT patterns
* CRUD functions
* Using Express and Mongoose to interact with MongoDB
* Testing API endpoints

### Notes
* REST: REpresentational State Transfer
  - A REST API takes an incoming HTTP request, does some processing, and always send back an HTTP response.
* The rules of a REST API
  - Request URLs: might have the same URL or parameter
  - Request methods: POST, GET, PUT, DELETE
  - Responses and status codes
    - Two key components to a response
      - The returned data: format: XML / JSON (we use JSON here)
      - HTTP status code
* Setting up API in Express
  - Create ```app_api``` folder at the top level
  - Create ```index.js``` in ```app_api/routes```
  - Include the routes in the application. In ```app.js```:
    - ```const apiRoutes = require('.app_api/routes/index');```
    - ```app.use('/api', apiRoutes);``` to tell the application to check the API routes for incoming requests
  - Specifying the request methods in the routes
  - Specifying required URL parameters
    - ```/api/locations/:locationid/reviews/:reviewid```
  - Defining loc8r API routes
  - Create controller placeholders
  - Include the model
    - Need to require Mongoose into the controller files and make API talk to the database
    - ```const mongoose = require('mongoose');``` // gives the controller access to the database connection
    - ```const Loc = mongoose.model('Location');``` // brings in the Location model so that we can interact with the Locations collection
    - Move models to app_api
* GET methods: reading data from MongoDB
  - Finding a single document in MongoDB using Mongoose
    ![ch6](/images/ch6-mongoosequery.png)
    - Mongoose interact with database via its models - import the Location model as Loc at top of controller files
    - ```exec``` method to start the database query
    - ```exec``` method executes the query and passes a callback function that will run when the operation is complete.
    - Ensures that the database interaction is asynchronous
  - Finding a single subdocument based on IDs
    - Limiting the paths returned from MongoDB
      ```
         Loc
           .findById(req.params.locationid)
           .select('name review')
           .exec();
      ```
      - ```select``` method accespts a space-separated string of the paths.
  - Finding multiple documents with geospatial queries
    - ```geoNear``` is not supported. Use ```aggregate``` instead   
* POST methods: adding data to MongoDB
  - URL parameters accessed using ```req.params```
  - Query strings accessed via ```via.query```
  - Express controllers access posted form data via ```req.body```
* PUT methods: updating data in MongoDB
  - ```.select('reviews -rating')``` ```-``` means we don't want to include reviews and rating
* DELETE method: deleting data from MongoDB
  - Document: ```findByIdAndRemove```
  - Subdocument:
    - ```location.reviews.id(reviewid)```
    - ```location.reviews.id(reviewid).remove()```   

### Answers to Readme Note Questions     
1. According to your API routing, what is the name of the function that will be called when the server receives a POST request at the ```/api/locations``` URL?

    Answer:
    - ```locationsCreate``` will be called.

2. What is the format of the data that the server returns when you make a request to the api URLs?

    Answer:
    - ```JSON```.


3. What is Postman for and why is it useful? How is its functionality similar to and different from a web browser like Chrome?

    Answer:
    - Postman is a complimentary to browser to test CRUD functions of our application. Since we can only test ```GET``` with our browser, we need Postman to help us test other methods such as ```POST```, ```PUT``` and ```DELETE```.

## Chapter 5
Building a data model with Mongoose and MongoDB

### Heroku App Web page
Here's the link to the [Heroku App](https://loc8r-yuangao.herokuapp.com)

### Screenshot
![ch5](/images/ch5-screenshot1.png)
![ch5](/images/ch5-screenshot2.png)

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
      - ```$ mongorestore -h [server address]:[port] -d [database name] -u [username] -p [password] dump/Loc8r```
      - The original book only has ```dump/``` instead of ```dump/Loc8r```.
    - Test    
  - Making the application use the right database
    - environment variable: ```NODE_ENV```
### Answers to Readme Note Questions
1. This chapter uses some EcmaScript 6 syntax which is a bit strange if you're accustomed to other programming languages (although it is covered in the Codecademy tutorial), specifically the ```=>``` (arrow) operator, which makes several appearances in ```db.js```. What does this operator do, in general? You may, of course, look it up online to answer this question.

    Answer:
    - An arrow function expression has a shorter syntax than a ```function expression``` and does not have its own ```this```, ```arguments```, ```super```, or ```new.target```. These function expressions are best suited for non-method functions, and they cannot be used as constructors.
    - Reference: [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)

2. What are individual database entries (items in a collection) called in MongoDB?

    Answer:
    - They are called ```documents```.

3. What's the difference between the command line commands ```mongo``` and ```mongod```? Which of these two needs to be running all the time in order for your application to work?

    Answer:
    - ```mongo``` is a MongoDB command-line shell and connects to a instance of ```mongod```. ```mongod``` starts the MongoDB server and will be running as a background. ```mongod``` has to be running all the time for the application to work.

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
    - Reference: [Getting Literal With ES6 Template Strings](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)

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
