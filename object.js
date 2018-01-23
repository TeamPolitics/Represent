function Politician(result,divisions,offices){

	this.name = result.name;
	this.role = offices.name;
	this.image = result.photoUrl;
	this.web = result.urls;
	this.party = result.party;
	this.emails = result.emails;
	this.address = result.address;
	this.phones = result.phones;
	this.location = divisions.name;
}
    
function createList(results){
    var politicians = [];
    var politician;
    for (i<0; i<results.length; i++)
    {
    	politician = new Politician(results.officials[i],results.divisions[i],results.offices[i]);
    	politicians.push();
    }

}

Politician.prototype.getNumber = function(){
	//parses district name to find number
	var result="";
	var character;
	var district = politician.location;
	for (i=0;i<district.length;i++)
	{
        character=district[i];
        if (!isNan(character))
        {
        	result += character;
        }
	}
	return result;
};

Politician.prototype.makeHTML = function(){
	//returns a string with the html for a specific politician
	var result = "<div class='row'>";
	var number = politician.getNumber();
	result+= "<div class='col-3-md'> <img src='"+politician.image+"' alt = '"+politician.name+"'>";
	result+= "</div> <div class='col-6-md'> <table class = 'table'><tr><th>Contact</th><th>District</th><th>Affiliation</th></tr>";
	result+= "<tr><td>"+politician.name+"</td><td>"+politician.location+"</td><td>"+politician.party+"</td></tr>";
	result+= "<tr><td><a href='"+politician.web+"'>"+politician.web+"</a></td><td>"+politician.address[0]+"</td><td></td></tr>";
	result+= "<tr><td><a href='mailto:"+politician.emails[0]+"' target='none'>"+politician.emails[0]+"</a></td><td>"+politician.address[1]+"</td><td></td></tr>";
	result+= "<tr><td>"+politician.phones[0]+"</td><td>"+politician.address.city+", "+politician.address.state+" "+politician.address.zip+"</td><td></td></tr>";
	result+= "</table></div><div class='col-3-md'>";
	result+= "<iframe frameborder='0' scrolling='no' marginheight='0' marginwidth='0'src='https://www.govtrack.us/congress/members/embed/mapframe?state=il&district=";
	result+= number+"'></iframe></div></div>";
    return result;
};



