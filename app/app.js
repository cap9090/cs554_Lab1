const express = require("express");
let app = express();
let configRoutes = require("./routes");
let bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
    //The first will log all request bodies, as well as the route they are requesting, and the HTTP verb they are using
    console.log("The current request is the following: ");
    console.log("the body of this request is " + req.body);
    console.log("the path of this request is " + req.path);
    console.log("the http verb of this request is " + req.method);
    next();
    return;
});

let urlRequests = {};
app.use(function (req,res, next){
    if(urlRequests[req.path]){
        urlRequests[req.path]++;
    } else {
        urlRequests[req.path] = 1;
    }
    console.log("all routes requested since server instantiated : "  + JSON.stringify(urlRequests));
    //The second will keep track of many times a particular URL has been requested, updating and logging with each request.

    next();
    return;
})


configRoutes(app);


app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});