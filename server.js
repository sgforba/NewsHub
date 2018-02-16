const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')
const rssParser = require('rss-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

//Declare DB
mongoose.connect('mongodb://admin:password@ds131258.mlab.com:31258/scraperdb1');

//Set Models
var Post = require('./models/posts.js');

//Declare App
const app = express();
//Tools
let parser = new rssParser();

//Fox Scraper
parser.parseURL('http://feeds.foxnews.com/foxnews/politics', function(err, feed) {
    var feedArray = [];
    feed.items.forEach(item => {
        var linkIndex = item.link.indexOf('~3/')+3;  
        item.source = "fox";
        item.timestamp = Date(item.pubDate);
        item.content = undefined;
        item.articleID = item.link.substring(linkIndex, linkIndex+11);
        feedArray.push(item);
    });

    var feedData =  _.uniqBy(feedArray, 'articleID');

    feedData.forEach(function(x) {
        if(x.contentSnippet) {
            new Post({
                url: x.guid,
                title: x.title,
                content: x.contentSnippet,
                source: x.source,
                id: x.articleID
            }).save(function(error, doc, next){
                if (error) {
                    console.log(error);
                  } else {
                    
                  }
            });   
        }
    });

});

//CNN Scraper
parser.parseURL('http://rss.cnn.com/rss/cnn_topstories.rss', function(err, feed) {
    var feedArray = [];
    feed.items.forEach(item => {
        item.source = "cnn";
        item.timestamp = Date(item.pubDate);
        item.content = undefined;
        item.articleID = item.link.substring(item.link.indexOf('~3/')+3, item.link.indexOf('/index'));
        feedArray.push(item);
    });

   var feedData =  _.uniqBy(feedArray, 'articleID');

    feedData.forEach(function(x) {
        if(x.contentSnippet) {
            new Post({
                url: x.guid,
                title: x.title,
                content: x.contentSnippet,
                source: x.source,
                id: x.articleID
            }).save(function(error, doc, next){
                if (error) {
                    console.log(error);
                  } else {
                    
                  }
            });   
        }
    
    });
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