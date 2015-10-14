//load the express package and create our app
var express = require('express'),
app = express(),
path = require('path');

//send our index html file to the user for the home page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/index.html'));
});

//create routes for the admin section

//get an instance of the router becuase we can make multiple express.Router()s
var adminRouter = express.Router();

//middleware declarations to happen before user is served routes
adminRouter.use(function(req,res,next){
  console.log(req.method, req.url);
  next();
});

adminRouter.param('name', function(req,res,next,name){
  console.log('doing name validation on' + name);
  req.name = name;
  next();
});

adminRouter.get('/hello/:name', function(req,res){
  res.send('hello' + req.name + '!');
  next();
});

//admin main page- the dashboard (http://localhost:1337/admin)
adminRouter.get('/', function(req, res){
  res.send('I am the dashboard');
});

//users page (http://localhost:1337/admin/users)
adminRouter.get('/users', function(req, res){
  res.send("I show all the users!");
});

//posts page(http//localhost:1337/admin/posts)
adminRouter.get('/posts', function(req, res) {
  res.send('I show all the posts');
});

//apply the routes to our application  by setting a default root 
app.use('/admin', adminRouter);



//start the server
app.listen(1337);
console.log('1337 is magic port');
