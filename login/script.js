/*/login
document.getElementsByName("userid2")[0].value="admin";
document.getElementsByName("passwd2")[0].value="admin";
PrepareSubmit();
document.form1.submit();
//toolbar function
console.log("starttttt");
var ifm = document.getElementById("iframe");
var cloud = document.querySelectorAll("#func_show>img")[0];
var home = document.querySelectorAll("#func_show>img")[1];
var wizard = document.querySelectorAll("#func_show>img")[2];
var set = document.querySelectorAll("#func_show>img")[3];
var usb = document.querySelectorAll("#func_show>img")[4];
var L2_0 = ifm.contentDocument.getElementById("L2_0");

set.onclick();*/

function sleep(sec){
    var time = new Date().getTime();
    while(new Date().getTime() - time < sec * 1000);
}
function login(){
	console.log("aaaa");
}
document.getElementsByName("username")[0].value="admin";
document.getElementsByName("password")[0].value="admin";
//PrepareSubmit();
//document.form1.submit();
document.getElementById("button1").click();
