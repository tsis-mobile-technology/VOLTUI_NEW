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
  	}
  }]);