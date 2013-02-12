// http://jscompress.com/
function getLogLines() {
	return document.getElementsByTagName('pre')[0].innerHTML.split('\\n');
}

function searchLog() {
	// http://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
	function htmlDecode(input) {
		var e = document.createElement('div');
		e.innerHTML = input;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}

	var lines = getLogLines();
	var filterEle = document.getElementById('filter');
	var filterText = (filterEle != null) ? filterEle.value : '';
	for (var i = 0; i < lines.length; i++) {
		var lineParts = lines[i].split('|');
		if(lineParts[1] == 'USER_DEBUG' && lineParts[4].indexOf(filterText) != -1) {
			alert(htmlDecode(lineParts[4]));
		}
	}
}

var eventStartEnd = {
	'CALLOUT_REQUEST':					'CALLOUT_RESPONSE',
	'CODE_UNIT_STARTED':				'CODE_UNIT_FINISHED',
	'CONSTRUCTOR_ENTRY':				'CONSTRUCTOR_EXIT',
	'CUMULATIVE_LIMIT_USAGE':			'CUMULATIVE_LIMIT_USAGE_END',
	'CUMULATIVE_PROFILING_BEGIN':		'CUMULATIVE_PROFILING_END',
	'DML_BEGIN':						'DML_END',
	'EXECUTION_STARTED':				'EXECUTION_FINISHED',
	'METHOD_ENTRY':						'METHOD_EXIT',
	'SOQL_EXECUTE_BEGIN':				'SOQL_EXECUTE_END',
	'SOSL_EXECUTE_BEGIN':				'SOSL_EXECUTE_END',
	'SYSTEM_CONSTRUCTOR_ENTRY':			'SYSTEM_CONSTRUCTOR_EXIT',
	'SYSTEM_METHOD_ENTRY':				'SYSTEM_METHOD_EXIT',
	'SYSTEM_MODE_ENTER':				'SYSTEM_MODE_EXIT',
	'VARIABLE_SCOPE_BEGIN':				'VARIABLE_SCOPE_END',
	'VF_DESERIALIZE_VIEWSTATE_BEGIN':	'VF_DESERIALIZE_VIEWSTATE_END',
	'VF_EVALUATE_FORMULA_BEGIN':		'VF_EVALUATE_FORMULA_END',
	'VF_SERIALIZE_VIEWSTATE_BEGIN':		'VF_SERIALIZE_VIEWSTATE_END',
	'WF_CRITERIA_BEGIN':				'WF_CRITERIA_END',
	'WF_RULE_EVAL_BEGIN':				'WF_RULE_EVAL_END',
};

var eventToStringIndices = {
	'BULK_HEAP_ALLOCATE': [1],
	'CALLOUT_REQUEST': [1],
	'CALLOUT_RESPONSE': [1],
	'CODE_UNIT_FINISHED': [1],
	'CODE_UNIT_STARTED': [4],
	'CONSTRUCTOR_ENTRY': [1,],
	'CONSTRUCTOR_EXIT': [1],
	'CUMULATIVE_LIMIT_USAGE': [1],
	'CUMULATIVE_LIMIT_USAGE_END': [1],
	'CUMULATIVE_PROFILING': [1],
	'CUMULATIVE_PROFILING_BEGIN': [1],
	'CUMULATIVE_PROFILING_END': [1],
	'DML_BEGIN': [1],
	'DML_END': [1],
	'EMAIL_QUEUE': [1],
	'ENTERING_MANAGED_PKG': [1],
	'EXCEPTION_THROWN': [1],
	'EXECUTION_FINISHED': [1],
	'EXECUTION_STARTED': [1],
	'FATAL_ERROR': [1],
	'HEAP_ALLOCATE': [1],
	'HEAP_DEALLOCATE': [1],
	'IDEAS_QUERY_EXECUTE': [1],
	'LIMIT_USAGE_FOR_NS': [1],
	'METHOD_ENTRY': [4],
	'METHOD_EXIT': [1],
	'POP_TRACE_FLAGS': [1],
	'PUSH_TRACE_FLAGS': [1],
	'QUERY_MORE_ITERATIONS': [1],
	'SAVEPOINT_ROLLBACK': [1],
	'SAVEPOINT_SET': [1],
	'SLA_END': [1],
	'SLA_EVAL_MILESTONE': [1],
	'SLA_NULL_START_DATE': [1],
	'SLA_PROCESS_CASE': [1],
	'SOQL_EXECUTE_BEGIN': [1,4],
	'SOQL_EXECUTE_END': [1,4],
	'SOSL_EXECUTE_BEGIN': [1],
	'SOSL_EXECUTE_END': [1],
	'STACK_FRAME_VARIABLE_LIST': [1],
	'SYSTEM_CONSTRUCTOR_ENTRY': [1,3],
	'SYSTEM_CONSTRUCTOR_EXIT': [1],
	'SYSTEM_METHOD_ENTRY': [3],
	'SYSTEM_METHOD_EXIT': [1],
	'SYSTEM_MODE_ENTER': [1],
	'SYSTEM_MODE_EXIT': [1],
	'TESTING_LIMITS': [1],
	'TOTAL_EMAIL_RECIPIENTS_QUEUED': [1],
	'USER_DEBUG': [1,4],
	'VALIDATION_ERROR': [1],
	'VALIDATION_FAIL': [1],
	'VALIDATION_FORMULA': [1],
	'VALIDATION_PASS': [1],
	'VALIDATION_RULE': [1],
	'VARIABLE_ASSIGNMENT': [1],
	'VARIABLE_SCOPE_BEGIN': [1],
	'VARIABLE_SCOPE_END': [1],
	'VF_APEX_CALL': [1,3,4],
	'VF_DESERIALIZE_VIEWSTATE_BEGIN': [1],
	'VF_DESERIALIZE_VIEWSTATE_END': [1],
	'VF_EVALUATE_FORMULA_BEGIN': [1],
	'VF_EVALUATE_FORMULA_END': [1],
	'VF_PAGE_MESSAGE': [1],
	'VF_SERIALIZE_VIEWSTATE_BEGIN': [1],
	'VF_SERIALIZE_VIEWSTATE_END': [1],
	'WF_ACTION': [1],
	'WF_ACTION_TASK': [1],
	'WF_ACTIONS_END': [1],
	'WF_APPROVAL': [1,3,4],
	'WF_APPROVAL_REMOVE': [1],
	'WF_APPROVAL_SUBMIT': [1],
	'WF_ASSIGN': [1],
	'WF_CRITERIA_BEGIN': [1,2,3],
	'WF_CRITERIA_END': [1,2],
	'WF_EMAIL_ALERT': [1],
	'WF_EMAIL_SENT': [1],
	'WF_ENQUEUE_ACTIONS': [1],
	'WF_ESCALATION_ACTION': [1],
	'WF_ESCALATION_RULE': [1],
	'WF_EVAL_ENTRY_CRITERIA': [1],
	'WF_FIELD_UPDATE': [1,2,3],
	'WF_FORMULA': [1,2,3],
	'WF_HARD_REJECT': [1],
	'WF_NEXT_APPROVER': [1],
	'WF_NO_PROCESS_FOUND': [1],
	'WF_OUTBOUND_MSG': [1],
	'WF_PROCESS_NODE': [1],
	'WF_REASSIGN_RECORD': [1],
	'WF_RESPONSE_NOTIFY': [1],
	'WF_RULE_ENTRY_ORDER': [1],
	'WF_RULE_EVAL_BEGIN': [1,2],
	'WF_RULE_EVAL_END': [1],
	'WF_RULE_EVAL_VALUE': [1],
	'WF_RULE_FILTER': [1],
	'WF_RULE_INVOCATION': [1],
	'WF_RULE_NOT_EVALUATED': [1],
	'WF_SOFT_REJECT': [1],
	'WF_SPOOL_ACTION_BEGIN': [1],
	'WF_TIME_TRIGGER': [1],
	'WF_TIME_TRIGGERS_BEGIN': [1],
};

//translates the log into a js object
function parselog() {
	function createNode(n, p) {
		return {name: n, parent: p, children: []};
	}
	function logLineToString(lineParts) {
		if(lineParts.length > 1) {
			var toString = '';
			if(eventToStringIndices[lineParts[1]]) {
				var indices = eventToStringIndices[lineParts[1]];
				for(var i=0; i<indices.length; i++) {
					if(i!=0) {
						toString += '|';
					}
					toString += lineParts[indices[i]];
				}
			}
			return toString;
		}
		return '';
	}
	var eventStack = new Array();
	var logTreeRoot = createNode(logLineToString(['root']), null);
	var currentNode = logTreeRoot;
	var lines = getLogLines();
	for (var i = 0; i < lines.length; i++) {
		var lineParts = lines[i].split('|');
		if(eventStack.length > 0 && eventStartEnd[eventStack[eventStack.length-1]] == lineParts[1]) { //If the line marks the end of another event
			var tmp = eventStack.pop();
			currentNode = currentNode.parent;
		} else { //the event
			//add the event to the tree
			eventStack.push(lineParts[1]); 
			var newChild = createNode(logLineToString(lineParts), currentNode);
			currentNode.children.push(newChild);
			if(eventStartEnd[lineParts[1]]) { //if the line marks the starting of an event
				currentNode = newChild; //move into the child
			}
		}
	}
	return logTreeRoot;
}
var INDENT_STRING = '&amp;nbsp;';//'-';
function logTreeToDivs(logTree) {
	function nodeToDiv(node, indentationLevel) {
		var lineContainer = document.createElement('div');
		var indentation = '';
		for(var i=0; i<indentationLevel; i++) {
			indentation += INDENT_STRING;
		}
		console.log(indentation);
		lineContainer.innerHTML = indentation + node.name;
		for(var i=0; i<node.children.length; i++) {
			lineContainer.appendChild(nodeToDiv(node.children[i], indentationLevel+1));
		}
		return lineContainer;
	}
	
	var container = document.createElement('div');
	for(var i=0; i<logTree.children.length; i++) {
		container.appendChild(nodeToDiv(logTree.children[i], 0));
	}
	return container;
}

// translate the logTree to a <ul>
function logTreeToUnorderedList(logTree) {
	function nodeToList(node) {
		var list = document.createElement('ul');
		list.innerHTML = node.name
		for(var i=0; i<node.children.length; i++) {
			var listItem = document.createElement('li');
			listItem.appendChild(nodeToList(node.children[i]));
			list.appendChild(listItem);
		}
		return list;
	}
	
	var container = document.createElement('div');
	for(var i=0; i<logTree.children.length; i++) {
		container.appendChild(nodeToList(logTree.children[i]));
	}
	return container;
}