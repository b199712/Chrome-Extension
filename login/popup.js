$("input[name='chk']").click(function () {
	var rad=document.querySelectorAll('[name=chk]');
	this.disabled=true;
	for(i=0;i<rad.length;i++)
	{
		if(this.value!=rad[i].value)
		{
			rad[i].disabled=false;
		}
	}
    clk(this.value);
});
function clk(value)
{
	chrome.tabs.query
	(
		{active: true, currentWindow: true},
		function(tabs) {
			chrome.tabs.sendMessage
			(
				tabs[0].id,
				{greeting: value},
				function(response) {  
					console.log(response.farewell);  
				}
			);  
		}
	); 
	console.log(value);
	
}