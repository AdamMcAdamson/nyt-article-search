var apiKey = "973e6b52b32e4212b225f59d1af1b44f";

// Required search form inputs
var searchTerm;
var numRecords;

// Optional search form inputs
var startYear;
var endYear;

// Total number of articles searched
var searchArticleNumber = 0;


// Article array from API call
var articleArr;

// Articles div element in DOM
var articlesDiv;

// Number of ajax calls (# of pages)
var numCalls;


$( document ).ready(function(){
	// Grab DOM element 
	articlesDiv = $("#articles");

	// When Search button is clicked, grab form info 
	// and call processing function makeRequests
	$("#search-button").on("click", function(){
		var keywords = $("#search-terms").val().trim();
		var numRecords = parseInt($("#num-drop").find(":selected").text());
		var start = $("#year-start").val().trim();
		var end = $("#year-end").val().trim();

		// Search and Processing function
		makeRequests(keywords, numRecords, start, end);
	});

	// Clear previous search results
	$("#clear-button").on("click", function(){
		searchArticleNumber = 0;
		articlesDiv.empty();
	});

});

// Search query and Processing function
function makeRequests(keywords, num, start, end){

	// Required form Info
	searchTerm = keywords;
	numRecords = num;

	// Optional form info
	startYear = start || null;
	endYear = end || null;

	// For checking proper input
	var startYearNum, endYearNum;
	
	// Check for proper startYear input
	if(startYear !== null){
		startYearNum = parseInt(startYear);
		if(startYearNum.toString.length !== 4){
			startYear = null;
		}
	}

	// Check for proper endYear input
	if(endYear !== null){
		endYearNum = parseInt(endYear);
		if(endYearNum.toString.length !== 4){
			endYear = null;
		}
	}

	// Default Parameters to search with
	var searchParameters = $.param({
		'api-key': apiKey,
		'q': searchTerm,
	});


	if(startYear !== null){
		searchParameters += $.param({
			'begin_date': startYear + "0101"
		});
	}

	if(endYear !== null){
		searchParameters += $.param({
			'end_date': endYear + "1231"
		});
	}

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
		for(var j = 0; j < numRecords; j++){

			// The array number in the DOM 
			// Broken b/c asyncronous
			// var articleNumber = (i * 10) + j + 1;
			
			// temp articleNumber
			var articleNumber = searchArticleNumber + j+1;



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

			var artCurDiv = $("<div class='article-div' id='article-div-" + articleNumber + " '>");

			var titleTag = $("<h3>");

			titleTag.append("<span class='article-num' id='article-num-" + articleNumber + "'>" + articleNumber + "</span>")

			titleTag.append("<b class='article-title' id='title-" + articleNumber + "'>" + articleTitle + "</b>");

			artCurDiv.append(titleTag);

			artCurDiv.append("<p class='byline' id='byline-" + articleNumber + "''>" + author + "</p>");
			
			artCurDiv.append("<p class='section' id='section-" + articleNumber + "''>Section: " + section + "</p>");

			artCurDiv.append("<p class='date' id='date-" + articleNumber + "'>" + pubDate + "</p>");

			artCurDiv.append("<a class='link' id='link-" + articleNumber + "' href='" + webLink + "'>" + webLink + "</a>");

			articlesDiv.append(artCurDiv);

		}

		searchArticleNumber += numRecords;

	});

}
