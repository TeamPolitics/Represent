var addressInputG = "3040d"
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

		//storing the data from AJAX request in the results variable
		var results = response.data;
        
        Object.keys(results.offices).forEach(function(key,index){

	    office = results.offices[key];
        for (i=0; i<office.officialIndices.length; i++)
        {
            var index = office.officialIndices[i];
            politician = new Politician(office,results.officials[index]);
            politicians.push(politician);
            $("#poli-info-here").append(politician.makeHTML());
        }
	    });

	}, function(error){
		console.log(JSON.parse(error.responseText))
		;
	});
}

displayPoliInfo();