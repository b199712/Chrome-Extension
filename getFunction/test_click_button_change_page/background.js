chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.tabs.query({'active': true}, function(tabs) {
		chrome.tabs.update(tabs[0].id, {url: "http://www.yahoo.com.tw"});
		var url = tabs[0].url;
		console.log(url);
	});
});


