
var betterKeyWords = { "deputyHeadOfGovernment": "Vice-President", "headOfState": "President", "legislatorUpperBody": "Senator",
"legislatorLowerBody": "Representative", "Democratic": "Democrat"};
var office;
var politician;
var politicians = [];



function Politician(office,official){

	this.name = official.name;
	// if (betterKeyWords.hasOwnProperty(office.roles[0]))
	// {
 //     this.role = betterKeyWords[office.roles[0]];
	// }
	// else
	// {	

    // }
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
      if (official.party in betterKeyWords){
          this.party = betterKeyWords[official.party];
      }
      else {
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

// Politician.prototype.getNumber = function(){
// //parses district name to find number
// var result="";
// var character;
// var district = this.location;
// for (var i=0;i<district.length;i++)
// {
//     character=district[i];
//         if (!isNaN(character))
//         {
//         	result += character;
//         }
// 	}
// 	return result;
// };
    
Politician.prototype.makeHTML = function(){
//returns a string with the html for a specific politician
var result = "<div class='row'>";
var demo = [];
var image = 0;
var contact = [];
var address = 0;
console.log(this);
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
// var number = this.getNumber();
 result+= "<div class='col-3-md'> <img src='"+image+"' alt = '"+name+"'>";
 result+= "<div class='col-6-md'><div><ul>";
 for (i=0;i<demo.length; i++)
 {
    result+= "<li>"+demo[i]+"</li>";
 }
 result += "</ul></div><div><ul>";
 for (i=0; i<contact.length; i++)
 {
    result+= "<li>"+contact[i]+"</li>";
 }
 result += "</ul></div></div>";
// result+= "</div> <div class='col-6-md'> <table class = 'table'><tr><th>Contact</th><th>District</th><th>Affiliation</th></tr>";
// result+= "<tr><td>"+this.name+"</td><td>"+this.location+"</td><td>"+this.party+"</td></tr>";
// result+= "<tr><td><a href='"+this.web+"'>"+this.web+"</a></td><td>"+this.address.line1+"</td><th>Role</th></tr>";
// console.log(result);
// if (this.email)
// {
// 	    result+= "<tr><td><a href='mailto:"+this.email+"' target='none'>"+this.email+"</a></td>";
// 	    if (this.address.line2)
//       {
//           result+= "<td>"+this.address.line2+"</td><td>"+this.role+"</td></tr>";
//           result+= "<tr><td>"+this.phones+"</td><td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td></td></tr>";
//       }

//       else
//       {
//     	   result+="<td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td>"+this.role+"</td></tr>";
//       } 
// }

// else
// {
//       result+= "<tr><td>" + this.phones+"</td>";
//       if (this.address.line2)
//       {
//           result+= "<td>"+this.address.line2+"</td><td>"+this.role+"</td></tr>";
//           result+= "<tr><td></td><td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td></td></tr>";
//       }

//       else
//       {
//     	    result+="<td>"+this.address.city+", "+this.address.state+" "+this.address.zip+"</td><td></td></tr>";
//       } 
// }
    result+= "<div class='col-3-md'>";
    //https://maps.googleapis.com/maps/api/staticmap?center=40.714728,-73.998672&zoom=12&size=400x400&key=YOUR_API_KEY
	// console.log(geo);
	// console.log(geo.address_components[0].long_name);
	var address = this.address;
	var formattedAddress="";
	
	if (address)
	{
        Object.keys(address).forEach(function(key)
        {   
        	var split = address[key].split(" ");
        	split = split.join("+");
    	    formattedAddress += (split + ",");
        });
	    console.log(formattedAddress);
	    formattedAddress = formattedAddress.slice(0,-1);
    }

    result+="<img src='https://maps.googleapis.com/maps/api/staticmap?center="+formattedAddress;
    result+="&markers=color:blue%7C"+formattedAddress+"&zoom=16&size=400x400&key=AIzaSyDNqjj1HtNHg4hB7cHnbE_ki-ejJnz9Vwo'></div></div>";
	console.log(result);
	return result;

};

