var betterKeyWords = {"Democratic": "Democrat"};

function Politician(office,official){

	  this.name = official.name;
	  
    if (official.photoUrl)
    {	
	      this.image = official.photoUrl;
    }
    else
    {
  	    this.image = "placeholder.png";
    }
  
    if (official.urls)
    {
	      this.web = official.urls;
    }
    if(official.party)
    {
        if (official.party in betterKeyWords)
        {
            this.party = betterKeyWords[official.party];
        }
        else 
        {
	          this.party = official.party;
        } 
    }
  	
    if (official.emails)
    {
	     this.email = official.emails[0];
    }
   
    if (official.address)
    {
        this.address = official.address[0];
    }
   
    if (official.phones)
    {
        this.phones = official.phones[0];
    }
	
    if (office.name)
    {
        this.location = office.name;
    }

}

Politician.prototype.makeHTML = function(){
    //returns a string with the html for a specific politician, layout uses divs and lists
    var result = "<div class='row'>";//each politician has their own row
    var demo = [];
    var image = 0;
    var contact = [];
    var address = 0;
    var politician = this;

    Object.keys(politician).forEach(function(key)
    {

        if (key == "name")
        {
            name = politician[key];
            demo.push(name);
        }

        if (key == "image")
        {
            image = politician[key];
        }
    
        if (key == "party")
        {
    	      if (politician[key] != "Unknown")
            {
                demo.push(politician[key]);
            }
        }

        if (key == "address")
        {
    	      address = politician[key];
        }

        if (key == "phones")
        {
    	      contact.push(politician[key]);
        }

        if (key == "location")
        {
    	      demo.push(politician[key]);
        }

        if (key == "web")
        {
    	      contact.push("<a href='"+politician[key]+"'target ='_blank'>"+politician[key]+"</a>");
        }

        if (key == "email")
        {
    	      contact.push("<a href='mailto:"+politician[key]+"'>"+politician[key]+"</a>");
        }
    });
    
    result+= "<div class='col-3-md'> <img class='portrait' src='"+image+"' alt = '"+name+"'></div>";
    result+= "<div class='col-6-md'><div class = 'row'><div class='col-6-md demo'><ul>";
    
    for (i=0;i<demo.length; i++)
    {
        result+= "<li>"+demo[i]+"</li>";
    }
    
    result += "</ul></div><div class='col-6-md contact'><ul>";
    
    for (i=0; i<contact.length; i++)
    {
        result+= "<li>"+contact[i]+"</li>";
    }

    result += "</ul></div></div></div>";
    result+= "<div class='col-3-md'>";
    var address = this.address;
	  var formattedAddress="";
	
	  if (address)//formats addresses to fit google's api - replaces spaces with + and adds commas
	  {
        Object.keys(address).forEach(function(key)
        {   
        	var split = address[key].split(" ");
        	split = split.join("+");
    	    formattedAddress += (split + ",");
        });
	      
        formattedAddress = formattedAddress.slice(0,-1);
    }

    result+="<img class = 'map' src='https://maps.googleapis.com/maps/api/staticmap?center="+formattedAddress;
    result+="&markers=color:blue%7C"+formattedAddress+"&zoom=14&size=300x300&key=AIzaSyDNqjj1HtNHg4hB7cHnbE_ki-ejJnz9Vwo'></div></div>";
		return result;
};


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

