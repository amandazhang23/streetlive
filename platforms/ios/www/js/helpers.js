// Validation functions by Amanda Zhang
// Validate name. Accepts a string and returns an error message or Null.
function validateName(name) {

    var reason= "";
    if (name == null || name == "") {
        reason += "Name must be filled out.";
    }
    else if (name.len > 20) {
        reason += "Name exceeds max length.";
    }
    else if (/[^a-zA-Z\-\'\ ]/.test(name)) {
        reason += "Name can only contain letters and hyphens.";
    }
    return reason;
}

// Validate username. Accepts a string and returns an error message or Null.
function validateUsername(username) {
    var reason = "";
    if (username == null || username == "") {
        reason += "Username must be filled out.";
    }
    else if (name.len > 10) {
        reason += "Username exceeds max length.";
    }
    // Should the database return an id from username, username exists
    else if ( users_db.transaction(function(tx){tx.executeSql('SELECT id FROM users WHERE username = ?', [username], function(tx, results){ 
	    if(results.rows.item.id != null && results.rows.item.id != ""){return true;}
    	}, function(tx){return false;})}, errorCB)){
		reason += "Username already exists";
	}

    return reason;
}

// Validate password and confirm password. Accepts a string and returns an error message or Null.
function validatePassword(password, confirmpw) {
    var reason = "";
    if (password == null || password == "") {
        reason += "Password must be filled out.";
    }
    else if (password.len > 20 || password.len < 6) {
        reason += "Passoword must be between 6 and 20 characters long.";
    }
    else if (password != confirmpw) {
        reason += "Passwords must match";
    }
    return reason;
}

// Validate email. Accepts a string and returns an error message string or Null.
function validateEmail(email) {

    var reason = "";
    if (email == null || email == "") {
        reason = "Email must be filled out.";
    }
    var emailExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
    if(emailExp.test(email)) {
        reason = "Not a valid email address.";
    }
    return reason;
}

// Validate description. Accepts a string and returns an error message string or Null.
function validateDescription(description) {
    var reason = "";
    if (description.len > 150) {
        reason = "Description exceeds max length of 150 characters.";
    }
    return reason;
}
// Checks that string inputs are not empty
function validateNotEmpty(formStr) {

    if (formStr == null || formStr == ''){
        return "Please complete all fields of the form.";
    }
    else {
	    return "";
    }

}

