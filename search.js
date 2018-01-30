var slicked = false;

$("button").on("click", function(event){
event.preventDefault();
var geo_error = false;
var addressInput = $("#input").val().trim();
//variable to store API from google civics
if (addressInput.length < 5 || isNaN(addressInput))
{
    $("#geo-error").text("Please enter a valid zipcode")
	geo_error = true;	
}
//variable to store API from google geo
var APIKeyG = "AIzaSyCuDsqDKUFb1QUNBy7-KughoBsoU7RkYRo";

//queryUrl using address
var queryURLG = "https://maps.googleapis.com/maps/api/geocode/json?key=" + APIKeyG + "&address=" + addressInput;
$.ajax({
	url: queryURLG,
	method: "GET"
})
	//after data returns from request
	.then(function(response) 
{
	//if response.status === zero_results push to div
	if (response.status === "ZERO_RESULTS") 
	{
	    $("#geo-error").text("Please enter a valid zipcode")
	    geo_error = true;
	} 
});




if (!geo_error)//only pulls data if zip is valid
{	
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
	//storing the data from AJAX request in the results variable
	if (slicked)//removes the slick attributes if user enters new zip
	{
	    $('.single-item').slick("unslick");
	    slicked = false;
    }
	$(".single-item").empty();//clears previously generated HTML
	var results = response;
	for (var i=0; i<results.offices.length; i++)
    {
      	var office = results.offices[i];
	    for (var j=0; j<office.officialIndices.length; j++)
        {
            var num = office.officialIndices[j];
            var politician = new Politician(office,results.officials[num]);
            $(".single-item").append(politician.makeHTML());
        }
	}
	$('.single-item').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        slide: "div .row"
    });
	slicked = true;
	$("#input").val(" ");
	}, function(error){
		console.log(JSON.parse(error.responseText));
	});
    }
        displayPoliInfo();
    }
    else
    {
	    $("#input").val(" ");
    }
});

