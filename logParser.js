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

//translates the log into a js object
function parselog() {
	function createNode(n, p) {
		return {name: n, parent: p, children: []};
	}
	function logLineToString(lineParts) {
		if(lineParts.length > 1) {
			return lineParts[1];
		}
		return lineParts[0];
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

// translate the logTree to a <ul>
function logTreeToList(logTree) {
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