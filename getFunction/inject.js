console.log("inject_page.js");
var menuTree_root_content=[];
console.log(menuTree_root_content.length);
var iframe = document.getElementById("iframe");
console.log(iframe);
var menuTree_root = iframe.contentDocument.querySelectorAll(".menuTree_root");
console.log(menuTree_root.length);
for(i=0;i<menuTree_root.length;i++){
	menuTree_root_content[i]=menuTree_root[i].firstChild.lastChild.firstChild.nodeValue;
	console.log(menuTree_root_content[i]);
}
console.log(menuTree_root_content.length);
//console.log(document.getElementById("IDwansetting"));
//window.postMessage({hello: 'world'}, '*');
//window.postMessage(menuTree_root_content,'*');
if(menuTree_root_content.length > 0){
	console.log("Length: "+menuTree_root_content.length);
	console.log(menuTree_root_content);
	//window.postMessage({hello: 'world'}, '*');
	window.postMessage(menuTree_root_content,'*');
}else{
	console.log("No value");
}