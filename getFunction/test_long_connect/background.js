chrome.runtime.onConnect.addListener(function(port) {
	
	console.log("Connected .....");
	port.onMessage.addListener(function(msg) {
		
		console.log("message receive "+ msg);
		port.postMessage("I'm background");
	});
});

