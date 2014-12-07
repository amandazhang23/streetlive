
// listen for deviceready
document.addEventListener("deviceready", onDeviceReady, false);

// create a variable to store webSQL database. This is local storage,
// appropriate for the scope of this protoype, but for publication we 
// would use a service like parse for database data retieval and multiple usership.
var perform_db;

// when deviceready heard, open the database and create a table
function onDeviceReady(){
    perform_db = window.openDatabase("StreetLive_DB", "1.0", "StreetLive DB", 100000);
    perform_db.transaction(createTbl, errorCB, successPerf);
}

// FOR DEBUGGING announce successful database
function successPerf(){
	alert("the performance database was created sucessfully");
}
// create a table if not exists with fields username (primary) name, 
// description, startTime, endTime and location, of type GEOGRAPHY, which will store
// the location each performance was announced at as a latitude-longitude POINT. 
// Accepts the transaction method and returns nothing.
function createTbl(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS perform (username VARCHAR PRIMARY KEY NOT NULL, name VARCHAR NOT NULL, description VARCHAR, startTime DATETIME, endTime DATETIME, location GEOGRAPHY)');
}

// 
function validateAnnounceOnSubmit(form) {
    var reason = "";
    reason += validateDescription(form.description.value);

    if (reason != "") {
        alert("Some fields need correction:\n" + reason);
    }
    else {
	// get the current position using google maps plugin or geolocator plugin
	var userObj = {
		//name: get performer's name or stagename by selector,
		//username: get performer's username by selector,
		//location: performer's current location object
		description: form.description.value,
		duration: form.duration.value
	};
        perform_db.transaction(function(tx){ announceDB(tx, userObj) }, errorCB);	
    }
    return false;
}
// Pseudo
function announceDB(tx, userObj){
	// format an sql query which will INSERT if username is not in table or UPDATE if they are
	// (two performances by the same artist may not occur at once).
	// startTime will be GETDATE() (sql function for current Date and time) and endTime will be
	// startTime plus DATEADD(userObj.duration, minutes).
	// if query is succesful, callback a function which refreshes the map view and performance feed.
	// If not, callback error
}
