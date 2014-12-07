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
// Cordova default junk
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
// Wait for device Apis to load
document.addEventListener("deviceready", pluginMap, false)

// Load map on map_canvas (BUGGED! the Cordova Plugin wont request our API credentials
function pluginMap(){
	// Listen for pause and resume events, initiate local session storage
//	document.addEventListener("pause", onPause, false);
//	document.addEventListener("resume", onResume, false);
	window.localStorage.setItem("login", false);
	window.localStorage.setItem("user_id", 0);
	// Store the user's current latLng in myPosition (this 90,90 is for test)
	var myPosition =  new plugin.google.maps.LatLng(90, 90);
	// Query cordova geolocator for current location to initialize map
/*	navigator.geolocation.getCurrentPosition(geoSuccess);
	function geoSuccess(position){
		myPosition = new plugin.google.maps.LatLng(90, 90); position.coords.latitude, position.coords.longitude);
	};*/
	// Grab the div where map belongs and initiate map at myPosition
	var mapDiv = document.getElementById("map_canvas");
	var map = plugin.google.maps.Map.getMap(mapDiv); /* {
		'controls': {
			'zoom': true
		},
		'camera': {
			'latLng': myPosition,
	    		'zoom': 11
	    	}
	});*/
	// When Map is ready to display, callback onMapInit to place markers
	map.on(plugin.google.maps.event.MAP_READY, onMapInit);
	function onMapInit(){
		$(document).on("pagecreate","#home",function(){
			map.setVisible();
		});
	};
	
}

// Pseudo:
// function onMapInit()
// query perform_db for performances in the vicinity of user using GEOGRAPHY function;
// check each results.rows.endTime with NOW() to see if the row should be displayed or removed;
// remove the old rows;
// add markers to map for new rows which have a listener "on touch" to display informaton about performance;
// style html display of performances and populate the #feed panel;
// add listeners to update the camera on drag, remove markers, and reload markers;
// add listeners to asynchronously update the feed and map with new elements from the database;
// listen for pause, resume and logout and update session information appropriately;
// allow users to update their username, password, description, name etc with appropriate database queries;
// get parse;
// win.
// modify session storage and update the dom with user's profile
function renderSeshDOM(tx, results, user){
	window.localStorage.setItem("login", true);
	window.localStorage.setItem("user_id", results.rows.item.id);
	console.log("user: %o", user);
	console.log("results: %o", results);
//	$("document").on("pagebeforecreate", "#home", function(user){
		$(".sesh_username").text(user.username);
		$("#userInfoLink .ui-btn-text").text(user.username);
		$(".sesh_email").text(user.email);
		if (user.role){
    			$(".sesh_description").html("<h2>Performer Description:</h2><p>" + user.description + "</p>");
	   		$("#perfAnnounce").html("<a href=" + "#announce" + " class=" + "ui-btn ui-btn-inline ui-btn-icon-left ui-icon-carat-l ui-alt-icon ui-btn-icon-notext" + ">Performing now?</a>");
		}
//	});    
	$.mobile.changePage("#home");
}

function failLogin(err){
	alert("Username and password do not match. Please retype.");
	console.log(err.code);
}


app.initialize();
