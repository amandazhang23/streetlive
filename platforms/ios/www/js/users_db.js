document.addEventListener("deviceready", onDeviceReady, false);

var users_db;

function onDeviceReady(){
    users_db = window.openDatabase("StreetLive_DB", "1.0", "StreetLive DB", 100000);
    users_db.transaction(createTbl, errorCB, successCB);
}

function createTbl(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS UsersTbl (id INTEGER PRIMARY KEY AUTOINCREMENT, Role TEXT NOT NULL, Name TEXT NOT NULL, Username TEXT NOT NULL, Password TEXT NOT NULL, Description)');
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success! db created");
}

function insertDB(tx)   {
    var _name = $("[name='pname']").val();
    var _username = $("[name='pusername']").val();
    var _password = $("[name='ppassword']").val();
    var sql = 'INSERT INTO UsersTbl (Role, Name, Userame, Password) VALUES ("Performer",?,?,?)';
    tx.executeSql(sql, [_name, _username, _password], successQueryDB, errorCB);
}

function successQueryDB(tx) {
    alert("successfully inserted, time to query");
    tx.executeSql('SELECT * FROM UsersTbl', [], renderList, errorCB);
}


function renderList(tx, results)    {
    var htmlstring = '';
    var len = results.rows.length;
    
    for (var i=0; i<len; i++)   {
        htmlstring += '<li>' + results.rows.item(i)
    }
}

function submitForm() {
    alert("insert worked method 1");
    console.log("pleaseeee");
    users_db.transaction(insertDB, errorCB);
    
    window.localStorage.setItem("name",$("[name='pname']").val());
    window.localStorage.setItem("username",$("[name='pusername']").val());
    window.localStorage.setItem("password",$("[name='ppassword']").val());
    window.localStorage.setItem("email",$("[name='pemail']").val());
    
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


//$("#pform").submit(function() {
//    alert("insert worked method 2");
//    users_db.transaction(insertDB, errorCB);
//    $.mobile.changePage("#home");
//});