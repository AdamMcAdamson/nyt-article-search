// api key - 973e6b52b32e4212b225f59d1af1b44f


var searchTerm = "Trump";

var numRecords = 1;

var startYear = "2010";
var endYear = "2011";

var articleArr;

var numCalls = Math.floor(numRecords/10);

if(numCalls < 1){
	numCalls = 1;
}

for(var i = 0; i < numCalls; i++){

	var numToUse = numRecords;
	if(numToUse > 10){
		numToUse = 10;
		numRecords -= 10;
	}

	var searchParameters = $.param({
		'api-key': '973e6b52b32e4212b225f59d1af1b44f',
		'q': searchTerm,
		'begin_date': startYear + "0101",
		'end_date': endYear +"0101",
		'page': i
	});

	var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + searchParameters;
	$.ajax({
		url: nytURL,
		method: "GET"
	}).done(function(nytResponse){
		articleArr = nytResponse.response.docs;

		for(var j = 0; j < numToUse; j++){

			var artCur = articleArr[j];
			var articleNumber = (i * 10) + j + 1;
			var articleTitle = artCur.headline.main;
			var author = artCur.byline.original;
			var section = artCur.section_name;
			var pubDate = artCur.pub_date;
			var webLink = artCur.web_url;
			console.log("__________ARTICLE_________")
			console.log("Number: " + articleNumber);
			console.log("Title: " + articleTitle);
			console.log("Author: " + author);
			console.log("Section: " + section);
			console.log("Date: " + pubDate);
			console.log("Link: " + webLink);
		}
		



	});

}

