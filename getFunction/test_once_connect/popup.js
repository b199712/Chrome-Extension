var array = [1,2,3,4,5];
chrome.runtime.sendMessage(array, function(response){console.log(response);});