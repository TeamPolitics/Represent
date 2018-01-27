
$("button").on("click", function(event){

event.preventDefault();
var addressInputG = $("#input").val().trim();
var addressInput = addressInputG;
//variable to store API from google civics

//variable to store API from google geo

var APIKeyG = "AIzaSyCuDsqDKUFb1QUNBy7-KughoBsoU7RkYRo";
var geo;
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
			geo = response.results[0];
			console.log(geo);
		}
	});



//variable for whatever the user inputs as address

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
		var results = response;
        Object.keys(results.offices).forEach(function(key,index){

	    office = results.offices[key];
	    console.log(office);
        for (i=0; i<office.officialIndices.length; i++)
        {
            var num = office.officialIndices[i];
            console.log(results.officials[num]);
            politician = new Politician(office,results.officials[num],num);
            politicians.push(politician);
            $(".single-item").append(politician.makeHTML());
        }
	    });

	}, function(error){
		console.log(JSON.parse(error.responseText))
		;
	});
}

displayPoliInfo();
$("#input").text("");
});

