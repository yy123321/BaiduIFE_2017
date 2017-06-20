/*
* @Author: FF
* @Date:   2017-06-15 17:20:57
* @Last Modified by:   FF
* @Last Modified time: 2017-06-19 11:45:02
*/

'use strict';
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function getHTTPObject() {
	if (typeof XMLHttpRequest == "undefined") {//IE
		XMLHttpRequest = function () {
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.6.0");
			}
			catch (e){}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP.3.0");
			}
			catch (e) {}
			try {
				return new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch (e) {}
			return false;
		}
	}
	return new XMLHttpRequest();//其他浏览器
}

function setPicture() {
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder-pic");
	placeholder.setAttribute("src", "images/guitarist.gif");
	placeholder.setAttribute("alt", "缩略图");

	//查找ParentElemnt和TargetElement
	var divElements = document.getElementsByTagName("div");
	for (var i=0; i<divElements.length; i++) {
		var parentElement = divElements[i];
		if (parentElement.getAttribute("class") == "header")//找到父元素
		{
			var targetElement = parentElement.getElementsByTagName("ul");
			parentElement.insertBefore(placeholder, targetElement[0]);
		}
	}
}

//点击按钮，将html页面插入到本页面中来
function clientSideInclude(id, url) {
	var request = getHTTPObject();
	var element = document.getElementById(id);
	if (!element) return false;

	if (request) {
		request.open("GET", url, true);

		request.onreadystatechange = function () {
			if (request.readyState == 4) {
				element.innerHTML = request.responseText;
			}
		};
		request.send(null);
	} else {
		alert("Sorry");
	}
}

function linkOperation(){
	var divElements = document.getElementsByTagName("div");
	for (var i=0; i<divElements.length; i++) {
		var parentElement = divElements[i];
		if (parentElement.getAttribute("class") == "header")//找到父元素
		{
			var linkElement = parentElement.getElementsByTagName("a");
			linkElement[0].onclick = function(){
				clientSideInclude("example", "2-float.html");
				return false;
			}
			linkElement[1].onclick = function() {
				clientSideInclude("example", "3-float.html");
				return false;
			}
			linkElement[2].onclick = function() {
				clientSideInclude("example", "3-float-liu.html");
				return false;
			}
		}
	}
}

addLoadEvent(linkOperation);