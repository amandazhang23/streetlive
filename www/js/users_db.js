// listen for deviceready
document.addEventListener("deviceready", onDeviceReady, false);

// create a variable to store webSQL database
var users_db;

// when deviceready heard, open the database and create a table
function onDeviceReady(){
    users_db = window.openDatabase("StreetLive_DB", "1.0", "StreetLive DB", 100000);
    users_db.transaction(createTbl, errorCB, successCB);
}

// create a table if not exists with fields id, role(true for performer, false for spectator), name,
// username, email, password, and description. Accepts the transaction method and returns nothing.
function createTbl(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, role BOOL NOT NULL, name VARCHAR, username VARCHAR NOT NULL, email VARCHAR NOT NULL, password VARCHAR NOT NULL, description VARCHAR)');
}

// if an error occurs, alert
function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

// (for degugging) alert that database was succesfully created
function successCB() {
    alert("success! db created");
}

// inserts a users registration information into the database and callsback.
// Accepts the transaction method object and user object with user's registration data, returns nothing.
function insertDB(tx, user)   {
    // store the template SQL string
    var sql = 'INSERT INTO users (role, name, username, email, password, description) VALUES (?,?,?,?,?,?)';
    // execute the query with user information from the user object
    tx.executeSql(sql, [user.role, user.name, user.username, user.email, user.password, user.description], function(tx){registerSuccessDB(tx, user)}, errorCB);
}

// When a user is succesfully registered, query for their id and populate DOM with their info
function registerSuccessDB(tx, user) {
    alert("successfully inserted, time to query");
    tx.executeSql('SELECT id FROM users WHERE username = ?', [user.username], function(tx, results){ renderSeshDOM(tx, results, user) }, errorCB);
}

// FOR DEBUGGING. Call this back for alert to display results of an sql query.
function renderList(tx, results){
    var htmlstring = '';
    var len = results.rows.length;
    // iterate through the rows of results, appending to a string which we'll alert.
    for (var i=0; i<len; i++)   {
        htmlstring += results.rows.item(i).id +" "+ results.rows.item(i).name +" "+ results.rows.item(i).username +" "+ results.rows.item(i).email +" "+ results.rows.item(i).password +" "+ results.rows.item(i).description + "\n";
    }
    alert (htmlstring);
}
// inspired by http://webcheatsheet.com/javascript/form_validation.php
// dynamically validate the submission of performer registration form. Alert with error message
// if checks fail, otherwise, hash password and send them to the next step in submission
function validatePFormOnSubmit(pForm) {
    // append error messages to reason string
    var reason = "";
    reason += validateName(pForm.pname.value);
    reason += validateUsername(pForm.pusername.value);
    reason += validatePassword(pForm.ppassword.value, pForm.pconfirm.value);
    reason += validateEmail(pForm.pemail.value);
    reason += validateDescription(pForm.pdescript.value);

    // if reason is not empty, the input had an error, so display
    if (reason != "") {
        alert("Some fields need correction:\n" + reason);
    }

    // if reason is empty, the checks were sucessful, so hash password and store in an object 
    // to be passed to insertDB
    else {
	var hash = CryptoJS.SHA1("" + pForm.ppassword.value);
	var userObj = {
		role: true,
		name: pForm.pname.value,
		username: pForm.pusername.value,
		password: hash,
		email: pForm.pemail.value,
		description: pForm.pdescript.value
	};
	// initialize a database transaction, insertDB on success, error on failure
        users_db.transaction(function(tx){ insertDB(tx, userObj) }, errorCB);	
    }
    return false;
}

// inspired by http://webcheatsheet.com/javascript/form_validation.php
// dynamically validate the submission of spectator registration form. Alert with error message
// if checks fail, otherwise, hash password and send them to the next step in submission
function validateSFormOnSubmit(sForm) {
    // append error messages to reason string
    var reason = "";
    reason += validateUsername(sForm.susername.value);
    reason += validatePassword(sForm.spassword.value, sForm.sconfirm.value);
    reason += validateEmail(sForm.semail.value);

    // if reason is not empty, the input had an error, so display
    if (reason != "") {
        alert("Some fields need correction:\n" + reason);
    }

    // if reason is empty, the checks were sucessful, so hash password and store in an object 
    // to be passed to insertDB
    else {
	var hash = CryptoJS.SHA1("" + sForm.spassword.value);
	var userObj = {
		role: false,
		name: "",
		username: sForm.susername.value,
		password: hash,
		email: sForm.semail.value,
		description: ""
	};
	// initialize a database transaction, insertDB on success, error on failure
        users_db.transaction(function(tx){ insertDB(tx, userObj) }, errorCB);	
    }
    return false;
}

<<<<<<< HEAD
// validate login form. Accepts the form as an html object and calls renderSeshDOM on valid credentials.
function validateLoginFormOnSubmit(form){
	// append error messages to reason string
	var reason = "";
	reason += validateNotEmpty(form.loginusr.value);
	reason += validateNotEmpty(form.loginpass.value);
	// if reason is not empty, the input had an error, so display
	if (reason != ""){
		alert("Some fields need correction:\n" + reason);
	}
	//if reason is empty, the checks were sucessful, so hash password and store in an object 
        // to be passed to insertDB
	else {
		// hash password
		var hash = CryptoJS.SHA1("" + form.loginpass.value);
		// query database with logon credentials to see if user exists.
		// experiencing bus here because username and password need to be added to the search index.
		// also, it may be innefective to rely on callback error/ success to indicate valid credentials
		users_db.transaction(function(tx){tx.executeSql('SELECT * FROM users WHERE username = ? AND password = ?', [form.loginusr.value, hash], function(tx, results){ 
			// put the results in an object so they can be used by renderSeshDOM
			var userObj = {
				role: results.rows.item.role,
				name: results.rows.item.name,
				username: results.rows.item.username,
				password: results.rows.item.password,
				email: results.rows.item.email,
				description: results.rows.item.description
			};

			// log for debugging
			console.log("userObj: %o", userObj);
			console.log("results: %o", results);
			// pass user object and results object to render sesh DOM
			renderSeshDOM(tx, results, userObj);
		// on failure, to Select call failLogin for invalid input alert. For error in dn.transaction, alert with the error
		}, failLogin);}, errorCB);
	}
	return false;
}
=======
/*function validateName(name) {
  -	if(name = )
   
}*/
>>>>>>> d0dfcf64df0a4e113ab0f293222bf6b3b99993f5

/*function onSubmit(pForm) {
    alert("insert worked method 1");
    console.log("pleaseeee");
    alert(pForm.pname.value +" "+ pForm.pemail.value);
    var hash = CryptoJS.SHA1("" + pForm.ppassword.value);
    var userObj = {
	role: true,
	name: pForm.pname.value,
	username: pForm.pusername.value,
	password: hash,
	email: pForm.pemail.value,
	description: pForm.pdescript.value
    };

    users_db.transaction(function(tx){ insertDB(tx, userObj) }, errorCB);
        
    //$.mobile.changePage("#home");
}*/



