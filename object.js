
var betterKeyWords = { "deputyHeadOfGovernment": "Vice-President", "headOfState": "President", "legislatorUpperBody": "Senator",
"legislatorLowerBody": "Representative", "Democratic": "Democrat"};
var office;
var politician;
var politicians = [];


function Politician(office,official,num){

	this.name = official.name;
	// if (betterKeyWords.hasOwnProperty(office.roles[0]))
	// {
 //     this.role = betterKeyWords[office.roles[0]];
	// }
	// else
	// {	
  if (office.roles)
  {  
	   this.role = office.roles[0];
	}
  else
  {
      this.role = 0;
  }
  // }
	this.image = official.photoUrl;
	this.web = official.urls;
	if (official.party in betterKeyWords){
      this.party = betterKeyWords[official.party];
	}
	else {
	    this.party = official.party;
  }    
	if (official.emails)
	{
	    this.email = official.emails[0];
  }
  else
  {
    	this.email = 0;
  }
	if (official.address)
  {
      this.address = official.address[0];
  }
  else
  {
      this.address = 0;
  }
	if (official.phones)
  {
  this.phones = official.phones[0];
  }
	this.location = office.name;
  this.index = num;
}

Politician.prototype.getNumber = function(){
//parses district name to find number
var result="";
var character;
var district = this.location;
for (var i=0;i<district.length;i++)
{
    character=district[i];
        if (!isNaN(character))
        {
        	result += character;
        }
	}
	return result;
};
    
Politician.prototype.makeHTML = function(){
//returns a string with the html for a specific politician
var result = "<div class='row' id ='"+this.index+"'>";
var number = this.getNumber();
result+= "<div class='col-3-md'> <img src='"+this.image+"' alt = '"+this.name+"'>";
result+= "</div> <div class='col-6-md'> <table class = 'table'><tr><th>Contact</th><th>District</th><th>Affiliation</th></tr>";
result+= "<tr><td>"+this.name+"</td><td>"+this.location+"</td><td>"+this.party+"</td></tr>";
result+= "<tr><td><a href='"+this.web+"'>"+this.web+"</a></td><td>"+this.address.line1+"</td><th>Role</th></tr>";
	if (this.email)
	{
	    result+= "<tr><td><a href='mailto:"+this.email+"' target='none'>"+this.email+"</a></td>";
	    if (this.address.line2)
      {
          result+= "<td>"+this.address.line2+"</td><td>"+this.role+"</td></tr>";
          result+= "<tr><td>"+this.phones+"</td><td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td></td></tr>";
      }

      else
      {
    	   result+="<td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td>"+this.role+"</td></tr>";
      } 
  }
  else
  {
      result+= "<tr><td>" + this.phones+"</td>";
      if (this.address.line2)
      {
          result+= "<td>"+this.address.line2+"</td><td>"+this.role+"</td></tr>";
          result+= "<tr><td></td><td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td></td></tr>";
      }

      else
      {
    	    result+="<td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td></td></tr>";
      } 
    }
 //  var coordinates = geo.geometry.location.lat+","+geo.geometry.location.lng
 //  result+= "</table></div><div class='col-3-md'>";
	// result+="<img src='https://maps.googleapis.com/maps/api/staticmap?center="+coordinates;
 //  result+="&markers=color:blue%7C"+coordinates+"&zoom=20&size=400x400&key=AIzaSyDNqjj1HtNHg4hB7cHnbE_ki-ejJnz9Vwo'></div></div>";
 //  //https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=YOUR_API_KEY
	// console.log(geo);
	// console.log(geo.address_components[0].long_name);
	return result;
};

