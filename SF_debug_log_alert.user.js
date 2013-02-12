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
script.innerHTML = 'function getLogLines(){return document.getElementsByTagName("pre")[0].innerHTML.split("\\n")}function searchLog(){function e(e){var t=document.createElement("div");t.innerHTML=e;return t.childNodes.length===0?"":t.childNodes[0].nodeValue}var t=getLogLines();var n=document.getElementById("filter");var r=n!=null?n.value:"";for(var i=0;i<t.length;i++){var s=t[i].split("|");if(s[1]=="USER_DEBUG"&&s[4].indexOf(r)!=-1){alert(e(s[4]))}}}function parselog(){function e(e,t){return{name:e,parent:t,children:[]}}function t(e){if(e.length>1){var t="";if(eventToStringIndices[e[1]]){var n=eventToStringIndices[e[1]];for(var r=0;r<n.length;r++){if(r!=0){t+="|"}t+=e[n[r]]}}return t}return""}var n=new Array;var r=e(t(["root"]),null);var i=r;var s=getLogLines();for(var o=0;o<s.length;o++){var u=s[o].split("|");if(n.length>0&&eventStartEnd[n[n.length-1]]==u[1]){var a=n.pop();i=i.parent}else{n.push(u[1]);var f=e(t(u),i);i.children.push(f);if(eventStartEnd[u[1]]){i=f}}}return r}function logTreeToList(e){function t(e){var n=document.createElement("ul");n.innerHTML=e.name;for(var r=0;r<e.children.length;r++){var i=document.createElement("li");i.appendChild(t(e.children[r]));n.appendChild(i)}return n}var n=document.createElement("div");for(var r=0;r<e.children.length;r++){n.appendChild(t(e.children[r]))}return n}var eventStartEnd={CALLOUT_REQUEST:"CALLOUT_RESPONSE",CODE_UNIT_STARTED:"CODE_UNIT_FINISHED",CONSTRUCTOR_ENTRY:"CONSTRUCTOR_EXIT",CUMULATIVE_LIMIT_USAGE:"CUMULATIVE_LIMIT_USAGE_END",CUMULATIVE_PROFILING_BEGIN:"CUMULATIVE_PROFILING_END",DML_BEGIN:"DML_END",EXECUTION_STARTED:"EXECUTION_FINISHED",METHOD_ENTRY:"METHOD_EXIT",SOQL_EXECUTE_BEGIN:"SOQL_EXECUTE_END",SOSL_EXECUTE_BEGIN:"SOSL_EXECUTE_END",SYSTEM_CONSTRUCTOR_ENTRY:"SYSTEM_CONSTRUCTOR_EXIT",SYSTEM_METHOD_ENTRY:"SYSTEM_METHOD_EXIT",SYSTEM_MODE_ENTER:"SYSTEM_MODE_EXIT",VARIABLE_SCOPE_BEGIN:"VARIABLE_SCOPE_END",VF_DESERIALIZE_VIEWSTATE_BEGIN:"VF_DESERIALIZE_VIEWSTATE_END",VF_EVALUATE_FORMULA_BEGIN:"VF_EVALUATE_FORMULA_END",VF_SERIALIZE_VIEWSTATE_BEGIN:"VF_SERIALIZE_VIEWSTATE_END",WF_CRITERIA_BEGIN:"WF_CRITERIA_END",WF_RULE_EVAL_BEGIN:"WF_RULE_EVAL_END"};var eventToStringIndices={BULK_HEAP_ALLOCATE:[1],CALLOUT_REQUEST:[1],CALLOUT_RESPONSE:[1],CODE_UNIT_FINISHED:[1],CODE_UNIT_STARTED:[4],CONSTRUCTOR_ENTRY:[1],CONSTRUCTOR_EXIT:[1],CUMULATIVE_LIMIT_USAGE:[1],CUMULATIVE_LIMIT_USAGE_END:[1],CUMULATIVE_PROFILING:[1],CUMULATIVE_PROFILING_BEGIN:[1],CUMULATIVE_PROFILING_END:[1],DML_BEGIN:[1],DML_END:[1],EMAIL_QUEUE:[1],ENTERING_MANAGED_PKG:[1],EXCEPTION_THROWN:[1],EXECUTION_FINISHED:[1],EXECUTION_STARTED:[1],FATAL_ERROR:[1],HEAP_ALLOCATE:[1],HEAP_DEALLOCATE:[1],IDEAS_QUERY_EXECUTE:[1],LIMIT_USAGE_FOR_NS:[1],METHOD_ENTRY:[4],METHOD_EXIT:[1],POP_TRACE_FLAGS:[1],PUSH_TRACE_FLAGS:[1],QUERY_MORE_ITERATIONS:[1],SAVEPOINT_ROLLBACK:[1],SAVEPOINT_SET:[1],SLA_END:[1],SLA_EVAL_MILESTONE:[1],SLA_NULL_START_DATE:[1],SLA_PROCESS_CASE:[1],SOQL_EXECUTE_BEGIN:[1,4],SOQL_EXECUTE_END:[1,4],SOSL_EXECUTE_BEGIN:[1],SOSL_EXECUTE_END:[1],STACK_FRAME_VARIABLE_LIST:[1],SYSTEM_CONSTRUCTOR_ENTRY:[1,3],SYSTEM_CONSTRUCTOR_EXIT:[1],SYSTEM_METHOD_ENTRY:[3],SYSTEM_METHOD_EXIT:[1],SYSTEM_MODE_ENTER:[1],SYSTEM_MODE_EXIT:[1],TESTING_LIMITS:[1],TOTAL_EMAIL_RECIPIENTS_QUEUED:[1],USER_DEBUG:[1,4],VALIDATION_ERROR:[1],VALIDATION_FAIL:[1],VALIDATION_FORMULA:[1],VALIDATION_PASS:[1],VALIDATION_RULE:[1],VARIABLE_ASSIGNMENT:[1],VARIABLE_SCOPE_BEGIN:[1],VARIABLE_SCOPE_END:[1],VF_APEX_CALL:[1,3,4],VF_DESERIALIZE_VIEWSTATE_BEGIN:[1],VF_DESERIALIZE_VIEWSTATE_END:[1],VF_EVALUATE_FORMULA_BEGIN:[1],VF_EVALUATE_FORMULA_END:[1],VF_PAGE_MESSAGE:[1],VF_SERIALIZE_VIEWSTATE_BEGIN:[1],VF_SERIALIZE_VIEWSTATE_END:[1],WF_ACTION:[1],WF_ACTION_TASK:[1],WF_ACTIONS_END:[1],WF_APPROVAL:[1,3,4],WF_APPROVAL_REMOVE:[1],WF_APPROVAL_SUBMIT:[1],WF_ASSIGN:[1],WF_CRITERIA_BEGIN:[1,2,3],WF_CRITERIA_END:[1,2],WF_EMAIL_ALERT:[1],WF_EMAIL_SENT:[1],WF_ENQUEUE_ACTIONS:[1],WF_ESCALATION_ACTION:[1],WF_ESCALATION_RULE:[1],WF_EVAL_ENTRY_CRITERIA:[1],WF_FIELD_UPDATE:[1,2,3],WF_FORMULA:[1,2,3],WF_HARD_REJECT:[1],WF_NEXT_APPROVER:[1],WF_NO_PROCESS_FOUND:[1],WF_OUTBOUND_MSG:[1],WF_PROCESS_NODE:[1],WF_REASSIGN_RECORD:[1],WF_RESPONSE_NOTIFY:[1],WF_RULE_ENTRY_ORDER:[1],WF_RULE_EVAL_BEGIN:[1,2],WF_RULE_EVAL_END:[1],WF_RULE_EVAL_VALUE:[1],WF_RULE_FILTER:[1],WF_RULE_INVOCATION:[1],WF_RULE_NOT_EVALUATED:[1],WF_SOFT_REJECT:[1],WF_SPOOL_ACTION_BEGIN:[1],WF_TIME_TRIGGER:[1],WF_TIME_TRIGGERS_BEGIN:[1]}';
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