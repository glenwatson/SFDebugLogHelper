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
script.innerHTML = 'function getLogLines(){return document.getElementsByTagName("pre")[0].innerHTML.split("\\n")}function searchLog(){function e(e){var t=document.createElement("div");t.innerHTML=e;return t.childNodes.length===0?"":t.childNodes[0].nodeValue}var t=getLogLines();var n=document.getElementById("filter");var r=n!=null?n.value:"";for(var i=0;i<t.length;i++){var s=t[i].split("|");if(s[1]=="USER_DEBUG"&&s[4].indexOf(r)!=-1){alert(e(s[4]))}}}function parselog(){function e(e,t){return{name:e,parent:t,children:[]}}function t(e){if(e.length>1){return e[1]}return e[0]}var n=new Array;var r=e(t(["root"]),null);var i=r;var s=getLogLines();for(var o=0;o<s.length;o++){var u=s[o].split("|");if(n.length>0&&eventStartEnd[n[n.length-1]]==u[1]){var a=n.pop();i=i.parent}else{n.push(u[1]);var f=e(t(u),i);i.children.push(f);if(eventStartEnd[u[1]]){i=f}}}return r}function logTreeToList(e){function t(e){var n=document.createElement("ul");n.innerHTML=e.name;for(var r=0;r<e.children.length;r++){var i=document.createElement("li");i.appendChild(t(e.children[r]));n.appendChild(i)}return n}var n=document.createElement("div");for(var r=0;r<e.children.length;r++){n.appendChild(t(e.children[r]))}return n}var eventStartEnd={CALLOUT_REQUEST:"CALLOUT_RESPONSE",CODE_UNIT_STARTED:"CODE_UNIT_FINISHED",CONSTRUCTOR_ENTRY:"CONSTRUCTOR_EXIT",CUMULATIVE_LIMIT_USAGE:"CUMULATIVE_LIMIT_USAGE_END",CUMULATIVE_PROFILING_BEGIN:"CUMULATIVE_PROFILING_END",DML_BEGIN:"DML_END",EXECUTION_STARTED:"EXECUTION_FINISHED",METHOD_ENTRY:"METHOD_EXIT",SOQL_EXECUTE_BEGIN:"SOQL_EXECUTE_END",SOSL_EXECUTE_BEGIN:"SOSL_EXECUTE_END",SYSTEM_CONSTRUCTOR_ENTRY:"SYSTEM_CONSTRUCTOR_EXIT",SYSTEM_METHOD_ENTRY:"SYSTEM_METHOD_EXIT",SYSTEM_MODE_ENTER:"SYSTEM_MODE_EXIT",VARIABLE_SCOPE_BEGIN:"VARIABLE_SCOPE_END",VF_DESERIALIZE_VIEWSTATE_BEGIN:"VF_DESERIALIZE_VIEWSTATE_END",VF_EVALUATE_FORMULA_BEGIN:"VF_EVALUATE_FORMULA_END",VF_SERIALIZE_VIEWSTATE_BEGIN:"VF_SERIALIZE_VIEWSTATE_END",WF_CRITERIA_BEGIN:"WF_CRITERIA_END",WF_RULE_EVAL_BEGIN:"WF_RULE_EVAL_END"}';
document.getElementsByTagName('head')[0].appendChild(script);

var style = document.createElement('style');
script.setAttribute('type', 'text/css');
style.innerHTML = 'div ul{margin-top:0; margin-bottom:0; padding-top:0; padding-bottom:0;}';
document.getElementsByTagName('head')[0].appendChild(style);


var alertBtn = document.createElement('button');
alertBtn.setAttribute('onClick', 'searchLog();');
alertBtn.innerHTML = 'alert DEBUGs';
document.getElementsByTagName('body')[0].insertBefore(alertBtn, document.getElementsByTagName('pre')[0]);

if(true)
{
	var filter = document.createElement('input');
	filter.setAttribute('type', 'text');
	filter.setAttribute('id', 'filter');
	filter.setAttribute('onkeydown', 'if(event.keyCode == 13) {searchLog();}');
	document.getElementsByTagName('body')[0].insertBefore(filter, document.getElementsByTagName('pre')[0]);
}

var parseBtn = document.createElement('button');
parseBtn.setAttribute('onclick', 'document.getElementsByTagName("body")[0].insertBefore(logTreeToList(parselog()), document.getElementsByTagName("pre")[0]);');
parseBtn.innerHTML = 'parse';
document.getElementsByTagName('body')[0].insertBefore(parseBtn, document.getElementsByTagName('pre')[0]);