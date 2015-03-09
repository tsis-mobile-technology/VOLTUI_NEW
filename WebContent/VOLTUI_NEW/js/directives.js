'use strict';

/* Directives */

angular.module('cpmApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('appName', ['appname', function(appname) {
  	return function(scope, elm, attrs) {
  		elm.text(appname);
  	};
  }]).
  directive('draggable', function($document) {
	  return function(scope, element, attr) {
	    var startX = 0, startY = 0, x = 0, y = 0;
	    element.css({
//	     border: '1px solid red',
	     cursor: 'pointer',
	     display: 'block'//,
//	     position: 'absolute',
//	     backgroundColor: 'lightgrey',
//	     top: 0,
//	     right: 0,
//	     width: '280px'
//	     height: '180px'
	    });
	    element.on('dblclick', function(event) {
	      // Prevent default dragging of selected content : mousedown
	      event.preventDefault();
	      startX = event.screenX - x;
	      startY = event.screenY - y;
	      $document.on('mousemove', mousemove);
	      $document.on('mouseup', mouseup);
	    });

	    function mousemove(event) {
	      y = event.screenY - startY;
	      x = event.screenX - startX;
	      element.css({
	        top: y + 'px',
	        left:  x + 'px'
	      });
	    }

	    function mouseup() {
	      $document.off('mousemove', mousemove);
	      $document.off('mouseup', mouseup);
	    }
	  };
	});