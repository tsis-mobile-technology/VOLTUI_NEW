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
  directive('fileModel', ['$parse', function ($parse) {
	    return {
	        restrict: 'A',
	        link: function(scope, element, attrs) {
	            var model = $parse(attrs.fileModel);
	            var modelSetter = model.assign;
	            
	            element.bind('change', function(){
	                scope.$apply(function(){
	                    modelSetter(scope, element[0].files[0]);
	                });
	            });
	        }
	    };
  }]).  
  directive('draggable', function($document) {
	  return function(scope, element, attr) {
	    var startX = 0, startY = 0, x = 0, y = 0;
	    element.css({
//	     border: '1px solid red',
	     cursor: 'pointer'
	     ,display: 'block'//,
//	     position: 'absolute',
//	     backgroundColor: 'lightgrey',
//	     top: 0,
//	     right: 0,
//	     width: '280px'
//	     ,height: '180px'
	    });
	    
	    element.on('mousedown', function(event) {
	      // Prevent default dragging of selected content : mousedown	
	      var target = event.target || event.srcElement;

	      console.log(target.getAttribute('class'));
	      if(target.getAttribute('class') ==="logo") {
	    	  event.preventDefault();
		      startX = event.screenX - x;
		      startY = event.screenY - y;
		      $document.on('mousemove', mousemove);
		      $document.on('mouseup', mouseup);  
	      }
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
	})
	.directive('fileDownload', function ($compile) {
		//https://atasteofsandwich.wordpress.com/2014/02/03/client-side-csv-download-with-angularjs/
	    var fd = {
	        restrict: 'A',
	        link: function (scope, iElement, iAttrs) {
	
	            scope.$on("downloadFile", function (e, url) {
	                var iFrame = iElement.find("iframe");
	                if (!(iFrame && iFrame.length > 0)) {
	                    iFrame = $("<iframe style='position:fixed;display:none;top:-1px;left:-1px;'/>");
	                    iElement.append(iFrame);
	                }
	
	                iFrame.attr("src", url);
	
	
	            });
	        }
	    };

    	return fd;
	});