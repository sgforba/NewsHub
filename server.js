const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const rssParser = require('rss-parser');
const mongoose = require('mongoose');
const _ = require('lodash');
const scraper = require('./scraper.js')
const cheerio = require('cheerio');

//Declare DB
mongoose.connect('mongodb://admin:password@ds131258.mlab.com:31258/scraperdb1');

//Set Models
var Post = require('./models/posts.js');

//Declare App
const app = express();

//Tools
let parser = new rssParser();
scraper.parsefox();
scraper.parsecnn();




//ALL GET
app.get('/api/', function(req,res,next){
    
	Post.find({}, function(err, docs) {
		
		var dateCheck = ((new Date().getTime() - (12 * 60 * 60 * 1000))/1000);
		var data =  _.uniqBy(docs, 'id');

		data = data.filter(x => x.timestamp > dateCheck);
		
		if(err){
			return res.status(500).send("Couldn't run the query");
		} else {
			res.json(data);
		}
		
	})
});

//CNN GET
app.get('/api/cnn', function(req,res,next){
    
	Post.find({"source": 'cnn'}, function(err, docs) {

        var data =  _.uniqBy(docs, 'id');
		if(err){
			return res.status(500).send("Couldn't run the query");
		} else {
			res.json(data);
		}
		
	})
});

//FOX GET
app.get('/api/fox', function(req,res,next){

	Post.find({"source": 'fox'}, function(err, docs) {

        var data =  _.uniqBy(docs, 'id');

		if(err){
			return res.status(500).send("Couldn't rum the query");
		} else {
			res.json(data);
		}
		
	})
});


app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});