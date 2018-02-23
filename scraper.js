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
        item.timestamp = Date(item.pubDate);
        item.content = undefined;
        item.articleID = item.link.substring(linkIndex, linkIndex+11); 
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
                    timestamp: Math.round(new Date(x.pubDate).getTime()/1000),
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
        item.timestamp = Date(item.pubDate);
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
                    timestamp: Math.round(new Date(x.pubDate).getTime()/1000),
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
// module.exports.parsenbc = function(){parser.parseURL('http://rss.cnn.com/rss/cnn_topstories.rss', function(err, feed) {
//     /* WHEN SCRAPING PAGE FOR IMAGE LOOK FOR <meta content="https://cdn.cnn.com/cnnnext/dam/assets/180214191628-08-florida-school-shooting-gallery-0214-super-tease.jpg" name="thumbnail"> tag*/

//     //SCRAPING
//     var feedArray = [];
//     feed.items.forEach(item => {
//         item.source = "cnn";
//         item.timestamp = Date(item.pubDate);
//         item.content = undefined;
//         item.articleID = item.link.substring(item.link.indexOf('~3/')+3, item.link.indexOf('/index'));  

//         feedArray.push(item);
//     });

//     feedArray.forEach(item => {
//         rp(item.guid)
//         .then( function (data) {
//              var $ = cheerio.load(data);
//              item.image = $('meta[name="thumbnail"]').attr('content');
//         })
    
//     });

//     ///DATA CLEANING
//     var feedData =  _.uniqBy(feedArray, 'articleID');
//     //SAVE TO DB
//     feedData.forEach(function(x) {
//         rp(x.guid).then( function(data){
//             var $ = cheerio.load(data);
//             x.image = $('meta[name="thumbnail"]').attr('content');            
//             if(x.contentSnippet && x.image) {
//                 new Post({
//                     url: x.guid,
//                     title: x.title,
//                     content: x.contentSnippet,
//                     source: x.source,
//                     id: x.articleID,
//                     timestamp: Math.round(new Date(x.pubDate).getTime()/1000),
//                     image: x.image
//                 }).save(function(error, doc, next){
//                     if (error) {
//                         console.log(error);
//                     } else {
                        
//                     }
//                 });   
//             }
//         })
//     });
// });
// }