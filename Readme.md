# Yuan Gao Getting MEAN 2nd Ed Book Project (loc8r)
Yuan Gao's Getting MEAN Book Project for CS 5610 Web Development

## Chapter 3
### Heroku App Web page
Here's the link to Heroku App Web Page of [loc8r-yuangao](https://loc8r-yuangao.herokuapp.com)

### Screenshot
![ch3](/images/ch3-screenshot.png)

### Notes
* Managing dependencies by using npm and a package.json file
  - npm is a package manager that gets installed with Node, which gives you the ability to download Node modules or packages to extend the functionality of your application
  - package.json: contains metadata about a project, including dependencies
  - ```$ npm install``` tells npm to install all of the dependencies listed in the package.json file into a folder in the application called *node_modules*
  ![ch3](/images/ch3-npm_and_packagejson.png)
  - ```$ npm install --save package-name``` tells npm to download and install the new package into the node_modules folder and add this package to the list of dependencies in the package.json file
* Creating and configuring Express projects
  - ```$ express``` installs the Express framework with default settings into a folder
  - Configuration options
    - Which HTML template engine to use (default: Jade)
      - HTML template engine: compile HTML template and data to final HTML markup for browser
      - Pug templates must be indented using spaces, not tabs!
    - Which CSS preprocessor to use (default: N/A)
    - Whether to create a .gitignore file
  - ```$ express --view=pug --git``` will create an Express project which uses Pug as the HTML template and generates a .gitignore file
  - ```$ DEBUG=loc8r:* npm start``` will run Express application and can be opened in browser with localhost:3000
  - Express middleware:
    - in app.js file there are ```app.use``` lines known as *middleware*.
    - All requests to Express server run through the middleware defined in app.js file
    ![ch3](/images/ch3-Express_process.png)
  - Node application compiles before running. Jade templates, CSS files and client-side JS can be updated on-the-fly.
    - use ```$ nodemon``` to restart
* Setting up an MVC environment
  - An architecture to separate out data (model), display (view) and application logic (control)
* Adding Twitter Bootstrap for layout
* Publishing to a live URL and using Git and Heroku

### Answers to Readme Note Questions
1. The default app.js file generated by Express declares variables using the ``` var ``` keyword. What are the two new keywords introduced in EcmaScript 6 that the author discusses, and what is his recommendation for declaring variables in app.js?

    Answer:
    - The two new keywords that the author discusses are ``` const ``` and ``` let ```. Variables defined with ``` const ``` cannot be changed at a later point in the code, and variables defined with ``` let ``` can be changed.
    - What the author recommends is that we should always define variables with ``` const ``` unless the value is going to change and all instances of ``` var ``` in app.js can be changed to ``` const ```.

2. What do we call the process of mapping URL requests to the functionality we want to associate with the URL? For example, when the URL / is requested (this represents the base URL for our application's domain), we want to execute the controller function that renders our title page. What do we call the code that connects a URL request to our controller code?

    Answer:
    - The process of mapping URL requests to the functionality that we want to associate with is called routing, and the code is called router.
