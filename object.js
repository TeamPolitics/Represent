var results = {
 "kind": "civicinfo#representativeInfoResponse",
 "normalizedInput": {
  "line1": "1311 West Thorndale Avenue",
  "city": "Chicago",
  "state": "IL",
  "zip": "60660"
 },
 "divisions": {
  "ocd-division/country:us": {
   "name": "United States",
   "officeIndices": [
    0,
    1
   ]
  },
  "ocd-division/country:us/state:il": {
   "name": "Illinois",
   "officeIndices": [
    2
   ]
  },
  "ocd-division/country:us/state:il/cd:9": {
   "name": "Illinois's 9th congressional district",
   "officeIndices": [
    3
   ]
  }
 },
 "offices": [
  {
   "name": "President of the United States",
   "divisionId": "ocd-division/country:us",
   "levels": [
    "country"
   ],
   "roles": [
    "headOfState",
    "headOfGovernment"
   ],
   "officialIndices": [
    0
   ]
  },
  {
   "name": "Vice-President of the United States",
   "divisionId": "ocd-division/country:us",
   "levels": [
    "country"
   ],
   "roles": [
    "deputyHeadOfGovernment"
   ],
   "officialIndices": [
    1
   ]
  },
  {
   "name": "United States Senate",
   "divisionId": "ocd-division/country:us/state:il",
   "levels": [
    "country"
   ],
   "roles": [
    "legislatorUpperBody"
   ],
   "officialIndices": [
    2,
    3
   ]
  },
  {
   "name": "United States House of Representatives IL-09",
   "divisionId": "ocd-division/country:us/state:il/cd:9",
   "levels": [
    "country"
   ],
   "roles": [
    "legislatorLowerBody"
   ],
   "officialIndices": [
    4
   ]
  }
 ],
 "officials": [
  {
   "name": "Donald J. Trump",
   "address": [
    {
     "line1": "The White House",
     "line2": "1600 Pennsylvania Avenue NW",
     "city": "Washington",
     "state": "DC",
     "zip": "20500"
    }
   ],
   "party": "Republican",
   "phones": [
    "(202) 456-1111"
   ],
   "urls": [
    "http://www.whitehouse.gov/"
   ],
   "photoUrl": "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/PE%20Color.jpg",
   "channels": [
    {
     "type": "GooglePlus",
     "id": "+whitehouse"
    },
    {
     "type": "Facebook",
     "id": "whitehouse"
    },
    {
     "type": "Twitter",
     "id": "potus"
    },
    {
     "type": "YouTube",
     "id": "whitehouse"
    }
   ]
  },
  {
   "name": "Mike Pence",
   "address": [
    {
     "line1": "The White House",
     "line2": "1600 Pennsylvania Avenue NW",
     "city": "Washington",
     "state": "DC",
     "zip": "20500"
    }
   ],
   "party": "Republican",
   "phones": [
    "(202) 456-1111"
   ],
   "urls": [
    "http://www.whitehouse.gov/"
   ],
   "photoUrl": "https://www.whitehouse.gov/sites/whitehouse.gov/files/images/45/VPE%20Color.jpg",
   "channels": [
    {
     "type": "GooglePlus",
     "id": "+whitehouse"
    },
    {
     "type": "Facebook",
     "id": "whitehouse"
    },
    {
     "type": "Twitter",
     "id": "VP"
    }
   ]
  },
  {
   "name": "Tammy Duckworth",
   "address": [
    {
     "line1": "524 Hart Senate Office Building",
     "city": "Washington",
     "state": "DC",
     "zip": "20510"
    }
   ],
   "party": "Democratic",
   "phones": [
    "(202) 224-2854"
   ],
   "urls": [
    "https://www.duckworth.senate.gov"
   ],
   "photoUrl": "http://bioguide.congress.gov/bioguide/photo/D/D000622.jpg",
   "channels": [
    {
     "type": "Facebook",
     "id": "SenDuckworth"
    },
    {
     "type": "Twitter",
     "id": "SenDuckworth"
    },
    {
     "type": "YouTube",
     "id": "SenDuckworth"
    }
   ]
  },
  {
   "name": "Richard J. Durbin",
   "address": [
    {
     "line1": "711 Hart Senate Office Building",
     "city": "Washington",
     "state": "DC",
     "zip": "20510"
    }
   ],
   "party": "Democratic",
   "phones": [
    "(202) 224-2152"
   ],
   "urls": [
    "http://www.durbin.senate.gov/public/"
   ],
   "photoUrl": "http://bioguide.congress.gov/bioguide/photo/D/D000563.jpg",
   "channels": [
    {
     "type": "Facebook",
     "id": "SenatorDurbin"
    },
    {
     "type": "Twitter",
     "id": "SenatorDurbin"
    },
    {
     "type": "YouTube",
     "id": "SenatorDurbin"
    }
   ]
  },
  {
   "name": "Janice D. Schakowsky",
   "address": [
    {
     "line1": "2367 Rayburn House Office Building",
     "city": "Washington",
     "state": "DC",
     "zip": "20515"
    }
   ],
   "party": "Democratic",
   "phones": [
    "(202) 225-2111"
   ],
   "urls": [
    "http://schakowsky.house.gov/"
   ],
   "photoUrl": "http://bioguide.congress.gov/bioguide/photo/S/S001145.jpg",
   "emails": [
    "jan.schakowsky@mail.house.gov"
   ],
   "channels": [
    {
     "type": "Facebook",
     "id": "janschakowsky"
    },
    {
     "type": "Twitter",
     "id": "janschakowsky"
    },
    {
     "type": "YouTube",
     "id": "repschakowsky"
    }
   ]
  }
 ]
}

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

var betterKeyWords = { deputyHeadOfGovernment: "Vice-President", headOfState: "Executive Branch", legislatorUpperBody: "Senator",
legislatorLowerBody: "Representative", Democratic: "Democrat"}


function Politician(office,official){

	this.name = official.name;
	if (betterKeyWords[office.roles[0]])
	{
		this.role = betterKeyWords[office.roles[0]];
	}
	else
	{	
	    this.role = office.roles[0];
	}
	this.image = official.photoUrl;
	this.web = official.urls;
	if (betterKeyWords[official.party]){
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
// var politician;   
// function createList(results){
//     var politicians = [];
//     var politician;


//     for (var i=0; i<results.offices.length; i++)
//     {
//     	for (j=0; j<results.offices[i].)
//     	politician = new Politician(results.officials[i],results.offices[i]);
//     	politicians.push(politician);
//     	console.log(politician);
//     }

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
    

//     return politicians;
// }




var delay = setTimeout(function() {
	alert("ding!");
	for (var i = 0; i<politicians.length; i++)
    {
   	    $("#content").append(politicians[i].makeHTML());
    }   
}, 5000);


