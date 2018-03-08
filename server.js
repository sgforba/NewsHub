const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const path = require('path');
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
const dev = app.get('env') !== 'production';

app.use(express.static(path.join(__dirname, 'client/build')));

//Tools
let parser = new rssParser();

setInterval(scraper.scrape, 600000);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });

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


app.listen(process.env.PORT || 5000)