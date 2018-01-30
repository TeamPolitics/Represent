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
