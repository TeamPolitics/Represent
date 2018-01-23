//Function to display info from Google Civic API
function displayPoliInfo() {
	//variable for whatever the user inputs as address
	var addressInput = $(this).attr("data-address");
	//queryUrl using address
	var queryURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyB0nuZo-jOlCHEFS6UB15CYoc0koH2nm8o&address=" + addressInput;

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
			var poliDiv = $("div class= 'item'>");

			//creating a variable tag to hold politician name
			var poliName = results[i].officials.name;

			//creating a paragraph tag with result of politician nam
			var p = $("<p>").text("Your representative's name: " + poliName);

		$("#poli-info-here").prepend(poliDiv);


		}
	});
}