var addressInputG = "3040d"
//variable to store API from google civics
var APIKeyG = "AIzaSyCuDsqDKUFb1QUNBy7-KughoBsoU7RkYRo";
//queryUrl using address
var queryURLG = "https://maps.googleapis.com/maps/api/geocode/json?key=" + APIKey + "&address=" + addressInputG;

	$.ajax({
		url: queryURL,
		method: "GET"
	})
	//after data returns from request
	.then(function(response) {
			console.log(queryURL);
			console.log(response);
		//if response.status === zero_results push to div
		if (response.status === "ZERO_RESULTS") {
			$("#geo-error").text("Please reenter your zipcode")
		//return formatted address
		} else {
			var location = 
		}
	}



//variable for whatever the user inputs as address
var addressInput = "60202";
//variable to store API from google civics
var APIKeyP = "AIzaSyB0nuZo-jOlCHEFS6UB15CYoc0koH2nm8o";
//queryUrl using address
var queryURLP = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + APIKey + "&address=" + addressInput;

//Function to display info from Google Civic API
function displayPoliInfo() {
	//Performing an AJAX request with queryURL
	$.ajax({
		url: queryURL,
		method: "GET"
	})
		//after data returns from request
		.then(function(response) {
			console.log(queryURL);
			console.log(response);

		//storing the data from AJAX request in the results variable
		var results = response.data;

		//Looking through the result of each item
		for (var i = 0; i < results.length; i++) {
			
			//creating and storing a div tag
			var poliDiv = $("<div>");

			//creating a variable tag to hold politician name
			var poliName = results[i].officials.name;

			//creating a paragraph tag with result of politician nam
			var p = $("<p>").text("Your representative's name: " + poliName);

		$("#poli-info-here").prepend(poliDiv);


		}

	}, function(error){
		console.log(JSON.parse(error.responseText))
		;
	});
}

displayPoliInfo();