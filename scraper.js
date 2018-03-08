const rssParser = require('rss-parser');
const _ = require('lodash');
const mongoose = require('mongoose');
const request = require('request');
var rp = require('request-promise');
const cheerio = require('cheerio');

let parser = new rssParser();
//Set Models
var Post = require('./models/posts.js');

//Fox Scraper
module.exports.parsefox =function(){ parser.parseURL('http://feeds.foxnews.com/foxnews/latest', function(err, feed) {
    var feedArray = [];

    feed.items.forEach(item => {
        var linkIndex = item.link.indexOf('~3/')+3;  
        item.source = "fox";
        item.date = new Date(item.pubDate);
        item.content = undefined;
        item.articleID = item.categories[0]._; 
        feedArray.push(item);
       
    });
    var feedData =  _.uniqBy(feedArray, 'articleID');
    //SAVE TO DB
    feedData.forEach(function(x) {
        
        rp(x.guid).then( function(data){
            var $ = cheerio.load(data);
            x.image = $('link[rel="image_src"]').attr('href');           
            if(x.contentSnippet && x.image) {
                
                new Post({
                    url: x.guid,
                    title: x.title,
                    content: x.contentSnippet,
                    source: x.source,
                    id: x.articleID,
                    date: x.date,
                    image: x.image
                }).save(function(error, doc, next){
                    if (error) {
                        console.log(error);
                    } else {
                        
                    }
                });   
            }
        })
    });

});
}


//CNN Scraper
module.exports.parsecnn = function(){parser.parseURL('http://rss.cnn.com/rss/cnn_topstories.rss', function(err, feed) {
    /* WHEN SCRAPING PAGE FOR IMAGE LOOK FOR <meta content="https://cdn.cnn.com/cnnnext/dam/assets/180214191628-08-florida-school-shooting-gallery-0214-super-tease.jpg" name="thumbnail"> tag*/

    //SCRAPING
    var feedArray = [];
    feed.items.forEach(item => {
        item.source = "cnn";
        item.date = new Date(item.pubDate);
        item.content = undefined;
        item.articleID = item.link.substring(item.link.indexOf('~3/')+3, item.link.indexOf('/index'));  

        feedArray.push(item);
    });

    feedArray.forEach(item => {
        rp(item.guid)
        .then( function (data) {
             var $ = cheerio.load(data);
             item.image = $('meta[name="thumbnail"]').attr('content');
        })
    
    });

    ///DATA CLEANING
    var feedData =  _.uniqBy(feedArray, 'articleID');
    //SAVE TO DB
    feedData.forEach(function(x) {
        rp(x.guid).then( function(data){
            var $ = cheerio.load(data);
            x.image = $('meta[name="thumbnail"]').attr('content');            
            if(x.contentSnippet && x.image) {
                new Post({
                    url: x.guid,
                    title: x.title,
                    content: x.contentSnippet,
                    source: x.source,
                    id: x.articleID,
                    date: x.date,
                    image: x.image
                }).save(function(error, doc, next){
                    if (error) {
                        console.log(error);
                    } else {
                        
                    }
                });   
            }
        })
    });
});
}

//NBC Scraper
module.exports.parsenbc = function(){parser.parseURL('https://www.cnbc.com/id/100003114/device/rss/rss.html', function(err, feed) {

    //SCRAPING
    var feedArray = [];
    feed.items.forEach(item => {
        
        item.source = "nbc";
        item.date = new Date(item.pubDate);
        item.content = undefined;
        item.articleID = item.guid.substring(item.guid.indexOf('_')+1, item.guid.indexOf('_')+9);  

        feedArray.push(item);
    });


    ///DATA CLEANING
    var feedData =  _.uniqBy(feedArray, 'articleID');

    //SAVE TO DB
    feedData.forEach(function(x) {
        rp(x.link).then( function(data){
            var $ = cheerio.load(data);
            x.image = $('meta[name="twitter:image"]').attr('content');          
            if(x.contentSnippet && x.image) {
                new Post({
                    url: x.link,
                    title: x.title,
                    content: x.contentSnippet,
                    source: x.source,
                    id: x.articleID,
                    date: x.date,
                    image: x.image
                }).save(function(error, doc, next){
                    if (error) {
                        console.log(error);
                    } else {
                        
                    }
                });   
            }
        })
    });

});
}

//BBC Scraper
module.exports.parsebbc = function(){parser.parseURL('http://feeds.bbci.co.uk/news/rss.xml', function(err, feed) {

    //SCRAPING
    var feedArray = [];
    feed.items.forEach(item => {
        item.source = "bbc";
        item.date = new Date(item.pubDate);
        item.content = undefined;
        item.articleID = item.guid.substring(item.guid.length-8, item.guid.length);  
        feedArray.push(item);
    });


    ///DATA CLEANING
    var feedData =  _.uniqBy(feedArray, 'articleID');
    
    //SAVE TO DB
    feedData.forEach(function(x) {
        rp(x.link).then( function(data){

            var $ = cheerio.load(data);
            x.image = $('meta[property="og:image"]').attr('content');  
                  
            if(x.contentSnippet && x.image) {
                new Post({
                    url: x.link,
                    title: x.title,
                    content: x.contentSnippet,
                    source: x.source,
                    id: x.articleID,
                    date: x.date,
                    image: x.image
                }).save(function(error, doc, next){
                    if (error) {
                        console.log(error);
                    } else {
                        
                    }
                });   
            }
        })
    });

});
}