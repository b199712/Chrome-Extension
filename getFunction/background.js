/*chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({'active': true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: "http://www.yahoo.com.tw"});
		var url = tabs[0].url;
		console.log(url);
	});
});*/

/*chrome.runtime.onConnect.addListener(function(port) {
	
	console.log("Connected .....");
	port.onMessage.addListener(function(msg) {
		
		console.log("message receive "+ msg);
		port.postMessage("I'm background");
	});
});*/
/*
var connections = {};

// Receive message from content script and relay to the devTools page for the
// current tab
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('incoming message from injected script');
  console.log(request);
  console.log(sender.tab);

  // Messages from content scripts should have sender.tab set
  if (sender.tab) {
    var tabId = sender.tab.id;
    if (tabId in connections) {
      connections[tabId].postMessage(request);
    } else {
      console.log("Tab not found in connection list.");
    }
  } else {
    console.log("sender.tab not defined.");
  }
  return true;
});

chrome.runtime.onConnect.addListener(function(port) {

  // Listen to messages sent from the DevTools page
  port.onMessage.addListener(function(request) {
    console.log('incoming message from dev tools page');

    // Register initial connection
    if (request.name == 'init') {
      connections[request.tabId] = port;
      port.onDisconnect.addListener(function() {
        delete connections[request.tabId];
      });

      return;
    }
  });
});
*/

var start=false;
//receive message from panel.js
chrome.runtime.onConnect.addListener(
	function(port){
		port.onMessage.addListener(
			function(request){
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
					if(request.start){
						chrome.tabs.sendMessage(tabs[0].id, {message:"get"}, function(response){if(response){console.log(response);port.postMessage({data:response, root:true});}});
					}else{
						chrome.tabs.sendMessage(tabs[0].id, {message:"set", root:request.root, func:request.func, id:request.eId}, 
						function(response){
							if(response){
								if(request.root){ 
									console.log(response); 
									port.postMessage({data:response, menu_child_id:request.eId, root:false});
								}
							}
						});
					}
				});
				/*if(request.start){
					//send message to script.js
					console.log("start: "+request.start);
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
						chrome.tabs.sendMessage(tabs[0].id, {message:"get"}, function(response){if(response){console.log(response);port.postMessage({data:response, root:true});}});
					});
				}else{
					console.log(request.func);
					console.log("start: "+request.start);
					console.log(request.root);
					console.log(request.eId);
					chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
						if(request.root){
							chrome.tabs.sendMessage(tabs[0].id, {message:"set", root:request.root, func:request.func, id:request.eId}, 
								function(response){
									if(response){
										console.log(response);
										port.postMessage({data:response, menu_child_id:request.eId, root:false});
									}
								
							});
						}
						else{
							chrome.tabs.sendMessage(tabs[0].id, {message:"set", root:request.root, func:request.func, id:request.eId}, 
								function(response){
									if(response){
										console.log(response);
									}
							});
						}
					});
				}*/
			}
		);
	}
);

//receive message from script.js
/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request);
  sendResponse("fromeback");
});*/
