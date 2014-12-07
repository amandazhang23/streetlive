
// listen for deviceready
document.addEventListener("deviceready", onDeviceReady, false);

// create a variable to store webSQL database
var perform_db;

// when deviceready heard, open the database and create a table
function onDeviceReady(){
    perform_db = window.openDatabase("StreetLive_DB", "1.0", "StreetLive DB", 100000);
    perform_db.transaction(createTbl, errorCB, successPerf);
}

function successPerf(){
	alert("the performance database was created sucessfully");
}
// create a table if not exists with fields username (primary) name, 
// description, startTime and endTime. Accepts the transaction method and returns nothing.
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

	var userObj = {
		role: true,
		name: pForm.pname.value,
		username: pForm.pusername.value,
		password: hash,
		email: pForm.pemail.value,
		description: pForm.pdescript.value
	};
        perform_db.transaction(function(tx){ insertDB(tx, userObj) }, errorCB);	
    }
    return false;
}

