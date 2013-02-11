// ==UserScript==
// @name        SF debug log helper
// @namespace   sf
// @description alerts debug lines in SF log files
// @include     https://*.salesforce.com/apexdebug/*
// @version     1
// @grant       none
// ==/UserScript==

var btn = document.createElement('button');
btn.setAttribute('onClick', "function htmlDecode(e){var t=document.createElement('div');t.innerHTML=e;return t.childNodes.length===0?'':t.childNodes[0].nodeValue}var lines=document.getElementsByTagName('pre')[0].innerHTML.split('\\n');for(var i=0;i<lines.length;i++){var lineParts=lines[i].split('|');if(lineParts[1]=='USER_DEBUG'){alert(htmlDecode(lineParts[4]))}}");
btn.innerHTML = 'alert DEBUGs';
var inserted = document.getElementsByTagName('body')[0].insertBefore(btn, document.getElementsByTagName('pre')[0]);

