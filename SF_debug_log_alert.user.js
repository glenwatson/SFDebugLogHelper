// ==UserScript==
// @name        SF debug log helper
// @namespace   sf
// @description alerts debug lines in SF log files
// @include     https://*.salesforce.com/apexdebug/*
// @version     1
// @grant       none
// ==/UserScript==

var script = document.createElement('script');
script.setAttribute('type', 'text/javascript');
script.innerHTML = 'function searchLog(){function e(e){var t=document.createElement("div");t.innerHTML=e;return t.childNodes.length===0?"":t.childNodes[0].nodeValue}var t=document.getElementsByTagName("pre")[0].innerHTML.split("\\n");var n=document.getElementById("filter");var r=n!=null?n.value:"";for(var i=0;i<t.length;i++){var s=t[i].split("|");if(s[1]=="USER_DEBUG"&&s[4].indexOf(r)!=-1){alert(e(s[4]))}}}';
document.getElementsByTagName('head')[0].appendChild(script);


var btn = document.createElement('button');
btn.setAttribute('onClick', 'searchLog();');
btn.innerHTML = 'alert DEBUGs';
document.getElementsByTagName('body')[0].insertBefore(btn, document.getElementsByTagName('pre')[0]);

if(true)
{
	var filter = document.createElement('input');
	filter.setAttribute('type', 'text');
	filter.setAttribute('id', 'filter');
	filter.setAttribute('onkeydown', 'if(event.keyCode == 13) {searchLog();}');
	document.getElementsByTagName('body')[0].insertBefore(filter, document.getElementsByTagName('pre')[0]);
}