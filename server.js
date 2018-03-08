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
scraper.parsenbc();
scraper.parsebbc();




//ALL GET
app.get('/api/', function(req,res,next){
    
	Post.find({}, function(err, docs) {
		
		var dateOffset = (24*60*60*1000) * 1;
		var myDate = new Date();
		myDate.setTime(myDate.getTime() - dateOffset);

		var data =  _.uniqBy(docs, 'id');

		data = data.filter(x => x.date > myDate)
		.sort(function(a,b){
			a.date-b.date
		});	

		if(err){
			return res.status(500).send("Couldn't run the query");
		} else {
			res.json(data);
		}
		
	})
});

//RECENT
app.get('/api/recent', function(req,res,next){
    
	Post.find({}, function(err, docs) {
		
		var dateOffset = (24*60*60*1000) * 0.;
		var myDate = new Date();
		myDate.setTime(myDate.getTime() - dateOffset);

		var data =  _.uniqBy(docs, 'id');

		data = data.filter(x => x.date > myDate);
		
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