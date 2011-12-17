(function($){$.fn.codemirrorHighlight = function(options) {
	
	var settings = $.extend( {
      'mode' : 'text/x-rst',
	  'gutter' : false
    }, options);

	var result = null;
	
	this.each(function() {
		var obj = $(this);
		var accum = [], gutter = [], size = 0;
		var callback = function(string, style) {
			if (string == "\n") {
				accum.push("<br>");
				gutter.push('<pre>'+(++size)+'</pre>');
			}
			else if (style) {
				accum.push("<span class=\"cm-" + CodeMirror.htmlEscape(style) + "\">" + CodeMirror.htmlEscape(string) + "</span>");
			}
			else {
				accum.push(CodeMirror.htmlEscape(string));
			}
		}
		CodeMirror.runMode(obj.val(), settings.mode, callback);
		result = $('<div class="CodeMirror">'+(settings.gutter?('<div class="CodeMirror-gutter"><div class="CodeMirror-gutter-text">'+gutter.join('')+'</div></div>'):'<!--gutter-->')+'<div class="CodeMirror-lines">'+(settings.gutter?'<div style="position: relative; margin-left: '+size.toString().length+'em;">':'<div>')+'<pre class="cm-s-default">'+accum.join('')+'</pre></div></div></div>').insertAfter(obj);
		obj.hide();
	});
	return result;
};})( jQuery );


