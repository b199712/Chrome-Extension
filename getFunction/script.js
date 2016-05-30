/*window.addEventListener('message', function(event) {
	// Only accept messages from same frame
	console.log("script1");

	if (event.source !== window) {
	return;
	}

	var message = event.data;
	console.log(message);
	// Only accept messages that we know are ours
	//if (typeof message !== 'object' || message === null || !message.hello) {
	//return;
	//}
	
	document.getElementById("iframe").contentDocument.querySelectorAll(".menuTree_root")[4].click;

	//chrome.runtime.sendMessage(message, function(response){console.log(response);});
});
*/

//send message to background.js
//chrome.runtime.sendMessage("from script11", function(response){console.log(response);});

//receive message from background.js
var menuArray = new Array();
var isGet = false;
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//sendResponse("from sc");
	if(request.message=="get" && !isGet){
		get_MenuTree_root(sendResponse);
	}else if(request.message=="set"){
		/*if(request.root)
			clickMenuTree_root(request.func, request.id, sendResponse);
		else
			clickMenuTree_child(request.func, request.id);*/
		clickMenuTree(request.root, request.func, request.id, sendResponse);
	}
		
});

function get_MenuTree_root(sendResponse){
	/*//二處
	var menuTree_root_content=[];
	var iframe = document.getElementById("iframe");
	var menuTree_root = iframe.contentDocument.querySelectorAll(".menuTree_root");
	for(i=0;i<menuTree_root.length;i++){
		menuTree_root_content[i]=menuTree_root[i].firstChild.lastChild.firstChild.nodeValue;
		// console.log(menuTree_root_content[i]);
	}
	if(menuTree_root_content.length > 0){
		console.log("get menuTree successful");
		isGet = true;
		sendResponse(menuTree_root_content);
	}else{
		console.log("No value");
	}
	*/
	//三處
	var menuTree_content=[];
	var menu_tree = document.getElementById("menu_tree").childNodes;
	if(menu_tree.length>0){
		for(var i=0; i<menu_tree.length;i++){
			menuTree_content[i] = menu_tree[i].getAttribute("id");
		}
		console.log("get menuTree successful");
		isGet = true;
		sendResponse(menuTree_content);
	}else{
		console.log("No value");
	}
	return;
}

function clickMenuTree(isroot, func, menuTree_child_id, sendResponse){
	var menuTree_child_content=[];
	var iframe = document.getElementById("iframe");
	var menuTree_child = iframe.contentDocument.getElementById(menuTree_child_id);
	
	if(menuTree_child == null){
		return;
	}
	
	var menuTree_child_list = menuTree_child.querySelectorAll("td>table>tbody>tr>td>a");
	
	console.log(menuTree_child_list);
	if(menuTree_child_list.length > 0){
		for(i=0;i<menuTree_child_list.length;i++){
			menuTree_child_content[i] = menuTree_child_list[i].firstChild.nodeValue;
			if(!isroot && menuTree_child_content[i]==func){
				menuTree_child_list[i].click();
			}
		}
	}
	if(isroot){
		menuTree_child.previousSibling.click();
		console.log(menuArray);
		for(i=0;i<menuArray.length;i++){
			if(menuTree_child_id == menuArray[i] ){
				console.log("same id: "+menuTree_child_id);
				return;
			}
		}
		menuArray.push(menuTree_child_id);
		console.log(menuArray);
		sendResponse(menuTree_child_content);
	}
}
/*function clickMenuTree_root(msg, menuTree_child_id, sendResponse){
	var menuTree_child, menuTree_child_list, menuTree_child_content=[];
	var iframe = document.getElementById("iframe");
	
	menuTree_child = iframe.contentDocument.getElementById(menuTree_child_id);
	menuTree_child.previousSibling.click();
	menuTree_child_list = menuTree_child.querySelectorAll("table>tbody>tr>td>a");
	if(menuTree_child_list.length > 0){
		for(i=0;i<menuTree_child_list.length;i++){
			menuTree_child_content[i] = menuTree_child_list[i].firstChild.nodeValue;
		}
	}
	//console.log(menuTree_child_content);
	sendResponse(menuTree_child_content);

	return;
}

function clickMenuTree_child(func, menuTree_child_id){

	var value=[];
	var iframe = document.getElementById("iframe");
	var menuTree_child = iframe.contentDocument.getElementById(menuTree_child_id);
	var menuTree_child_list = menuTree_child.querySelectorAll("table>tbody>tr>td>a");
	
	if(menuTree_child_list.length > 0){
		for(i=0;i<menuTree_child_list.length;i++){
			value[i] = menuTree_child_list[i].firstChild.nodeValue;
			if(value[i] == func){
				menuTree_child_list[i].click();
				return;
			}
		}
	}
	
	return;
}*/