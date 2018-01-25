
var betterKeyWords = { "deputyHeadOfGovernment": "Vice-President", "headOfState": "President", "legislatorUpperBody": "Senator",
"legislatorLowerBody": "Representative", "Democratic": "Democrat"};
var office;
var politician;
var politicians = [];

Object.keys(results.offices).forEach(function(key,index){

	office = results.offices[key];
    for (i=0; i<office.officialIndices.length; i++)
    {
         var index = office.officialIndices[i];
         politician = new Politician(office,results.officials[index]);
         politicians.push(politician);
    }
	
});


function Politician(office,official){

	this.name = official.name;
	if (betterKeyWords.hasOwnProperty(office.roles[0]))
	{
     this.role = betterKeyWords[office.roles[0]];
	}
	else
	{	
	   this.role = office.roles[0];
	}
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
	this.address = official.address[0];
	this.phones = official.phones[0];
	this.location = office.name;
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
var result = "<div class='row'>";
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

  result+= "</table></div><div class='col-3-md'>";
	result+= "<iframe frameborder='0' scrolling='no' width='90%' marginheight='0' marginwidth='0'src='https://www.govtrack.us/congress/members/embed/mapframe?state=il&district=";
	result+= number+"'></iframe></div></div>";
    return result;
};
    





var delay = setTimeout(function() {
	alert("ding!");
	for (var i = 0; i<politicians.length; i++)
    {
   	    $("#poli-info-here").append(politicians[i].makeHTML());
    }   
}, 5000);


