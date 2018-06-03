var express = require("express");
var request = require("request");

var app = express();

var PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index");
})

app.get("/movies", function(req, res){
    var movie = req.query.search;
    var url = `http://www.omdbapi.com/?s=${movie}&apikey=thewdb`;
    request(url, function(err, response, body){
        if(!err && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("movies", { movies : data});
        }
    })
})

app.get("/movies/:id", function(req, res){
    var movie_name = req.params.id;
    var url = `http://www.omdbapi.com/?i=${movie_name}&plot=full&apikey=thewdb`
    request(url, function(err, response, body){
        if(!err && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render("movie", { movie : data});
        }
    })
})

app.listen(PORT, function(){
    console.log("Server is running.");
})
