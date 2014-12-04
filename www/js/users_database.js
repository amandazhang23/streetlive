//add listener when device ready
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("StreetLive_DB", "1.0", "StreetLive DB", 100000);

//function will be called when device ready
function onDeviceReady(){
    db.transaction(createDB, errorCB, successCB);
}

//function will be called when performer registration submitted
$("#pform").submit(function() {
   db.transaction(populateDB, errorCB, successCB);
});

username = $("[name='pusername']".val();
password = $("[name='ppassword']".val();

window.localStorage.setItem("username",username);
window.localStorage.setItem("username",username);

$.mobile.changePage("#home");

//create table
function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS PerformersTbl (id INTEGER PRIMARY KEY AUTOINCREMENT, pusername TEXT NOT NULL, ppassword TEXT NOT NULL)');
}

//insert data
function populateDB(tx) {
    tx.executeSql('INSERT INTO PerformersTbl(pusername,ppassword) VALUES (uname)"+,+"")");
                  }
                  
                  
//function will be called when an error occurred
function errorCB(err) {
alert("Error processing SQL: "+err.code);
}

//function will be called when process succeed
function successCB() {
alert("success!");
db.transaction(queryDB, errorCB);
}
                  
////select all from PerformersTbl
//function queryDB(tx){
//    tx.executeSql('SELECT * FROM PerformersTbl',[],querySuccess,errorCB);
//}


// $("#name-input").val()

//document.addEventListener("deviceready", onDeviceReady, false);
//
//var db = "";
//
//function populateDB(tx) {
//    tx.executeSql('DROP TABLE IF EXISTS PerformersTbl');
//    tx.executeSql('CREATE TABLE IF NOT EXISTS PerformersTbl (p_username TEXT NOT NULL, p_password TEXT NOT NULL)');
//    tx.executeSql('INSERT INTO PerformersTbl(p_username,p_password) VALUES ("Ethan Alley", "e_pass")');
//    tx.executeSql('INSERT INTO PerformersTbl(p_username,p_password) VALUES ("Amanda Zhang", "a_word")');
//}
//
//function queryDB(tx) {
//    tx.executeSql('SELECT * FROM PerformersTbl', [], querySuccess, errorCB);
//}
//
//
//function querySuccess(tx,result){
//    var performerlist = document.getElementById("PerformerList");
//    var performers = "";
//    alert("The show is on");
//    var len = result.rows.length;
//    for (var i=0; i<len; i++){
//        alert(result.rows.item(i).p_username + result.rows.item(i).p_username);
//        performers = performers + '<li><a href="#"><p class="record">'+result.rows.item(i).p_username+'</p><p class="small">p_password '+result.rows.item(i).p_password+'</p></a></li>';
//    }
//
//    performerlist.innerHTML = performers;
//    $("#PerformerList").listview("refresh");
//}
//
//
//function errorCB(err) {
//    alert("Error processing SQL: "+err.code);
//}
//
//
//function successCB() {
//    db.transaction(queryDB, errorCB);
//}
//
//
//function onDeviceReady() {
//    db = window.openDatabase("Database", "1.0", "PhoneGap Demo", 200000);
//    db.transaction(populateDB, errorCB, successCB);
//}


//
//
//// Wait for Cordova to load
//document.addEventListener("deviceready", onDeviceReady, false);
//
//// Cordova is ready
//function onDeviceReady() {
//
//
//    
//    var db = window.sqlitePlugin.openDatabase({name: "streetlive"});
//    
//    db.transaction(function(tx) {
//        tx.executeSql('DROP TABLE IF EXISTS users');
//        tx.executeSql('CREATE TABLE IF NOT EXISTS users (id integer primary key, username, password)');
//                   
//        // demonstrate PRAGMA:
//        db.executeSql("pragma table_info (test_table);", [], function(res) {
//            console.log("PRAGMA res: " + JSON.stringify(res));
//        });
//                   
//        tx.executeSql("INSERT INTO streetlive (username, password) VALUES (?,?)", [$("#susername"), $("#spassword")], function(tx, res) {
//            console.log("insertId: " + res.insertId + " -- probably 1");
//            console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
//        });
//                                 
//        }, function(e) {
//            console.log("ERROR: " + e.message);
//    });
//};
