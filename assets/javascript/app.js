// api key - 973e6b52b32e4212b225f59d1af1b44f


// TEMP VALUES
// --------------------------
var searchTerm = "Trump";

var numRecords = 1;

var startYear = "2010";
var endYear = "2011";
// --------------------------

// Article array
var articleArr;

var articlesDiv = $("#articles");

// Number of ajax calls (# of pages)
var numCalls = Math.floor(numRecords/10) + 1;

// Loop to make requests
for(var i = 0; i < numCalls; i++){

	// Number of articles to use in this request
	var numToUse = numRecords;
	if(numToUse > 10){
		numToUse = 10;
		numRecords -= 10;
	}

	// Parameters to search with
	var searchParameters = $.param({
		'api-key': '973e6b52b32e4212b225f59d1af1b44f',
		'q': searchTerm,
		'begin_date': startYear + "0101",
		'end_date': endYear +"0101",
		'page': i
	});

	// URL to query with ajax
	var nytURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + searchParameters;

	// ajax request
	$.ajax({
		url: nytURL,
		method: "GET"
	}).done(function(nytResponse){

		// Grab the array of articles
		articleArr = nytResponse.response.docs;


		// Loop through each article
		for(var j = 0; j < numToUse; j++){

			// The array number in the DOM 
			// Broken b/c asyncronous
			// var articleNumber = (i * 10) + j + 1;
			
			// temp articleNumber
			var articleNumber = j+1;



			// Current Article obj
			var artCur = articleArr[j];

			// Article title (String)
			var articleTitle = artCur.headline.main;

			// Author (By JOHN SMITH)
			var author = artCur.byline.original;

			// Article section (Real Estate)
			var section = artCur.section_name;

			// Publication Date (2010-08-04T05:00:59Z)
			var pubDate = artCur.pub_date;

			// Link to full Article
			var webLink = artCur.web_url;



			// Debug Output
			console.log("__________ARTICLE_________");
			console.log("Number: " + articleNumber);
			console.log("Title: " + articleTitle);
			console.log("Author: " + author);
			console.log("Section: " + section);
			console.log("Date: " + pubDate);
			console.log("Link: " + webLink);
			console.log("__________________________");

			console.log("\n\n_____________CLEAR______________\n\n");

			var artCurDiv = $("<div>");

			var titleTag = $("<h3>");

			titleTag.append("<b class='label' id='article-num-" + articleNumber + "'>" + articleNumber + "</b>")

			titleTag.append("<b class='article-title' id='title-" + articleNumber + "'>" + articleTitle + "</b>");

			artCurDiv.append(titleTag);

			artCurDiv.append("<p class='byline' id='byline-" + articleNumber + "''>" + author + "</p>");
			
			artCurDiv.append("<p class='section' id='section-" + articleNumber + "''>Section: " + section + "</p>");

			artCurDiv.append("<p class='date' id='date-" + articleNumber + "'>" + pubDate + "</p>");

			artCurDiv.append("<a class='link' id='link-" + articleNumber + "' href='" + webLink + "'>" + webLink + "</a>");

			articlesDiv.append(artCurDiv);

		}

	});

}

