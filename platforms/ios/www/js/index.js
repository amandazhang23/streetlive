/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};



//add listener when device ready
document.addEventListener("deviceready", onDeviceReady, false);
var db = window.openDatabase("StreetLive_DB", "1.0", "StreetLive DB", 100000);

//function will be called when device ready
function onDeviceReady(){
    db.transaction(createDB, errorCB, successCB);
}

//function will be called when PerfForm submitted
$("#perfform").submit(function() {
    db.transaction(populateDB, errorCB, successCB);
});

//create table
function createDB(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS PerformersTbl (id INTEGER PRIMARY KEY AUTOINCREMENT, pusername TEXT NOT NULL, ppassword TEXT NOT NULL)');
}

//insert data
function populateDB(tx) {
    tx.executeSql('INSERT INTO PerformersTbl(pusername,ppassword) VALUES ("$("#pusername")", "$("#ppassword"))');
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
//    function initialize() {
//        var mapOptions = {
//        center: { lat: -34.397, lng: 150.644},
//        zoom: 8
//        };
//        var map = new google.maps.Map(document.getElementById('map-canvas'),
//                                      mapOptions);
//    }
//    google.maps.event.addDomListener(window, 'load', initialize);
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


app.initialize();
