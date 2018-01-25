var addressInputG = "60202"

	if (isNaN(addressInputG)
		|| addressInputG.length != 5) {
		alert("Please enter a valid zipcode!")
	}
//variable to store API from google civics
var APIKeyG = "AIzaSyCuDsqDKUFb1QUNBy7-KughoBsoU7RkYRo";
//queryUrl using address
var queryURLG = "https://maps.googleapis.com/maps/api/geocode/json?key=" + APIKeyG + "&address=" + addressInputG;

	$.ajax({
		url: queryURLG,
		method: "GET"
	})
	//after data returns from request
	.then(function(response) {
			console.log(queryURLG);
			console.log(response);
		//if response.status === zero_results push to div
		if (response.status === "ZERO_RESULTS") {
			$("#geo-error").text("Please reenter your zipcode")
		//return formatted address
		} else {
			var location = response.results[0].geometry;
			console.log(location);
			alert("it's working")

		}
	 });



//variable for whatever the user inputs as address
var addressInput = "60202";
//variable to store API from google civics
var APIKeyP = "AIzaSyB0nuZo-jOlCHEFS6UB15CYoc0koH2nm8o";
//queryUrl using address
var queryURLP = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + APIKeyP + "&address=" + addressInput;

//Function to display info from Google Civic API
function displayPoliInfo() {
	//Performing an AJAX request with queryURL
	$.ajax({
		url: queryURLP,
		method: "GET"
	})
		//after data returns from request
		.then(function(response) {
			console.log(queryURLP);
			console.log(response);

			//creating a variable tag to hold politician name
			var poliName = response.officials[3].name;

			//creating a paragraph tag with result of politician nam
			var p = $("<p>").text("Your representative's name: " + poliName);

		$("#poli-info-here").prepend(p);


		})

	
}

displayPoliInfo();