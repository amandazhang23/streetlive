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

function registerSuccessDB(tx, user) {
    alert("successfully inserted, time to query");
    tx.executeSql('SELECT id FROM users WHERE username = ?', [user.username], function(tx){ renderSeshDOM(tx, user) }, errorCB);
}




// FOR DEBUGGING. Call this back for alert to display results of a sql query.
function renderList(tx, results){
    var htmlstring = '';
    var len = results.rows.length;
    
    for (var i=0; i<len; i++)   {
        htmlstring += results.rows.item(i).id +" "+ results.rows.item(i).name +" "+ results.rows.item(i).username +" "+ results.rows.item(i).email +" "+ results.rows.item(i).password +" "+ results.rows.item(i).description + "\n";
    }
    alert (htmlstring);
}

function validatePFormOnSubmit(pForm) {
    var reason = "";
    reason += validateName(pForm.pname.value);
    reason += validateUsername(pForm.pusername.value);
    reason += validatePassword(pForm.ppassword.value, pForm.pconfirm.value);
    reason += validateEmail(pForm.pemail.value);
    reason += validateDescription(pForm.pdescript.value);

    if (reason != "") {
        alert("Some fields need correction:\n" + reason);
    }
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
        registerUser(userObj);	
    }
    return false;
}

function validateSFormOnSubmit(sForm) {
    var reason = "";
    reason += validateUsername(sForm.susername.value);
    reason += validatePassword(sForm.spassword.value, sForm.sconfirm.value);
    reason += validateEmail(sForm.semail.value);
    reason += validateDescription(sForm.sdescript.value);

    if (reason != "") {
        alert("Some fields need correction:\n" + reason);
    }
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
        registerUser(userObj);	
    }
    return false;
}

/*function validateName(name) {
  -	if(name = )
   
}*/

function onSubmit(pForm) {
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
    /*
    window.localStorage.setItem("name",$("[name='pname']").val());
    window.localStorage.setItem("username",$("[name='pusername']").val());
    window.localStorage.setItem("password",$("[name='ppassword']").val());
    window.localStorage.setItem("email",$("[name='pemail']").val());*/
    
    $.mobile.changePage("#home");
}


//$(document).on('pageinit', '#perfregister', function(){
//    $(document).on('click', '#submit', function() {
//       alert("insert worked method 1");
//       console.log("pleaseeee");
//       users_db.transaction(insertDB, errorCB);
//       
//       window.localStorage.setItem("name",$("[name='pname']").val());
//       window.localStorage.setItem("username",$("[name='pusername']").val());
//       window.localStorage.setItem("password",$("[name='ppassword']").val());
//       window.localStorage.setItem("email",$("[name='pemail']").val());
//       
//       $.mobile.changePage("#home");
//    })
//});


/*$("#pform").submit(function() {
    alert("insert worked method 2");
    users_db.transaction(insertDB, errorCB);
    $.mobile.changePage("#home");
});*/
