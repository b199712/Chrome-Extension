/*var content = document.getElementById("add");
var connectionToBackground = chrome.runtime.connect({name:"panel"});
console.log("panel.js");
connectionToBackground.onMessage.addListener(
	function(message){
	}
);
chrome.runtime.sendMessage({
	tabId:chrome.devtools.inspectedWindow.tabId, scriptToInject: "inject_page.js"
	console.log("panel");
});*/
/*function process(result, isException){
	chrome.runtime.postMessage({resutl1: result, isException1: isException});
}*/


/*var xhr = new XMLHttpRequest();
xhr.open('GET', chrome.extension.getURL('inject.js'), false);
xhr.send();
var script = xhr.responseText;

chrome.devtools.inspectedWindow.eval(script);

var backgroundPageConnection = chrome.runtime.connect({
	name: 'panel'
});

backgroundPageConnection.postMessage({
	name: 'init',
	tabId: chrome.devtools.inspectedWindow.tabId
});

backgroundPageConnection.onMessage.addListener(function(msg) {
	//addButton(msg);
});

function addButton(msg){
	var content = document.getElementById("add");
	var btn,text;
	for(i=0;i<msg.length;i++){
		btn = document.createElement("Button");
		text = document.createTextNode(msg[i]);
		btn.appendChild(text);
		content.appendChild(btn);
	}
}
*/

var port = chrome.runtime.connect({name: "twice"});
var enable_function = null,function_num;
//click button message value to background.js
document.getElementById('button1').addEventListener('click', isclick);
function isclick(){
	//var port = chrome.runtime.connect({name: "twice"});
	port.postMessage({start:true});
}

port.onMessage.addListener(function(msg){
	var menu;
	var btn,text,div,div_child;
	var id,root_id;
	var ul_root,li_root,ul_child,li_child;
console.log("ININININININ");
	if(msg.root){
		menu = document.getElementById("menu");
		for(i=0;i<msg.data.length;i++){
			function_num = msg.data.length;
			id = "L2_"+i;
			div = document.createElement("div");
			div.setAttribute("id",id);
			div.setAttribute("class","root");
			btn = document.createElement("button");
			btn.setAttribute("name",id);
			btn.onclick=clickHelpCallback(msg.data[i], msg.root, id);
			text = document.createTextNode(msg.data[i]);
			btn.appendChild(text);
			div.appendChild(btn);
			menu.appendChild(div);
		}
	}else{
		//document.getElementById("add").innerHTML=msg.menu_child_id;
		div_child = document.getElementById(msg.menu_child_id);
		for(i=0;i<msg.data.length;i++){
			btn = document.createElement("button");
			btn.setAttribute("class","child");
			btn.onclick=clickHelpCallback(msg.data[i], msg.root, msg.menu_child_id);
			text = document.createTextNode(msg.data[i]);
			btn.appendChild(text);
			div_child.appendChild(btn);
		}
	}
	/*for(i=0;i<msg.data.length;i++){
		btn = document.createElement("Button");
		if(msg.root){
			id = "L2_"+i;
			btn.setAttribute("id",id);
		}else{
			id = msg.menu_child_id;
		}
		btn.onclick=clickHelpCallback(msg.data[i], msg.root, id);
		text = document.createTextNode(msg.data[i]);
		btn.appendChild(text);
		menu.appendChild(btn);
	}*/
	/*if(msg.root){
		ul_root = document.createElement("ul");
		for(i=0;i<msg.data.length;i++){
			id = "L2_"+i;
			li_root = document.createElement("li");
			li_root.setAttribute("class","root");
			li_root.setAttribute("id",id);
			text = document.createTextNode(msg.data[i]);
			li_root.appendChild(text);
			li_root.onclick=clickHelpCallback(msg.data[i], msg.root, id);
			ul_root.appendChild(li_root);
		}
		menu.appendChild(ul_root);
	}else{
		root_id = document.getElementById(msg.menu_child_id);
		ul_child = document.createElement("ul");
		for(i=0;i<msg.data.length;i++){
			id = msg.data[i];
			li_child = document.createElement("li");
			li_child.setAttribute("class","child");
			li_child.setAttribute("id",id);
			text = document.createTextNode(msg.data[i]);
			li_child.appendChild(text);
			li_child.onclick=clickHelpCallback(msg.data[i], msg.root, id);
			ul_child.appendChild(li_child);
		}
		root_id.appendChild(ul_child);
	}*/
});

function clickHelpCallback(msg, isroot, id){
	return function(){
		clickHelp(msg ,isroot, id);
	};
}

function clickHelp(msg, isroot, id){
	//document.getElementById("add").innerHTML=msg;
	if(isroot){
		var divID;
		var buttonArray;
		var menu = document.querySelectorAll("#menu>div");
		buttonArray = document.querySelectorAll(".child");
		document.getElementById("add").innerHTML=buttonArray.length;
		/*for(i=0;i<menu.length;i++){
			divID = menu[i].id;
			buttonArray[i] = document.querySelectorAll("#"+menu[i].id+">button");
			for(j=1;j<buttonArray.length;j++){
				buttonArray[i][j].disabled = true;
			}
		}*/
		document.getElementsByName(id)[0].disabled = true;
		if(enable_function != null){
			document.getElementsByName(enable_function)[0].disabled = false;
			//document.querySelectorAll(".child").disabled = false;
			/*var queryfunction = "#"+enable_function+">button";
			var func_button = document.querySelectorAll(queryfunction);
			document.getElementById("add").innerHTML = func_button.length;*/
		}
		enable_function = id;
	}
	port.postMessage({start:false, root:isroot, func:msg, eId:id});
}