// http://jscompress.com/
function searchLog() {
	// http://stackoverflow.com/questions/1912501/unescape-html-entities-in-javascript
	function htmlDecode(input) {
		var e = document.createElement('div');
		e.innerHTML = input;
		return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
	}

	var lines = document.getElementsByTagName('pre')[0].innerHTML.split('\\n');
	var filterEle = document.getElementById('filter');
	var filterText = (filterEle != null) ? filterEle.value : '';
	for (var i = 0; i < lines.length; i++) {
		var lineParts = lines[i].split('|');
		if(lineParts[1] == 'USER_DEBUG' && lineParts[4].indexOf(filterText) != -1) {
			alert(htmlDecode(lineParts[4]));
		}
	}
}