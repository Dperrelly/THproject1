var http = require("http");

function printMessage(user, badges, points){
	console.log("User " + user + " has " + badges + " badges and " + points + " points.");
}

function printError(message){
	console.error(message);
}

function get(username){
	var request = http.get("http://teamtreehouse.com/" + username + ".json", function(response){
		var responseBody = "";

		response.on("data", function(dataChunk) {
		  responseBody += dataChunk;
		});
		
		response.on("end", function(){
			if(response.statusCode === 200){
				try {
					var profile = JSON.parse(responseBody);
					printMessage(username, profile.badges.length, profile.points.JavaScript)
				} catch(error) {
					printError(error.message);
				}

			} else {
				printError(http.STATUS_CODES[response.statusCode]);
      }
		});

	});

	request.on("error", function(error){
		console.error(error.message);
	});
}

module.exports.get = get;