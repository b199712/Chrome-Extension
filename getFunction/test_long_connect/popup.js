var url;
chrome.tabs.getSelected(null, function(tab){
	url = tab.url;
});
var port = chrome.runtime.connect({name: "Sample Communication"});
console.log("port");
port.postMessage("I'm popup");
port.onMessage.addListener(function(msg) {
        console.log("message receive: "+ msg);
		var content = document.getElementById("content");
		content.innerHTML = "<a href="+url+">"+url+"</a>";
});