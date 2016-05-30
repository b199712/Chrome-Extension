chrome.runtime.onMessage.addListener
(  
	function(request, sender, sendResponse)
	{  
		console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
		if (request.greeting == 1)
		{
			console.log(request.greeting);
			var s = document.createElement('script');
			s.src = chrome.extension.getURL("script.js");
			s.onload = function() {
				s.parentNode.removeChild(s);
			};
			document.head.appendChild(s);
			sendResponse({farewell: "I'm content,goodbye!"});  
		}  
	}
);


