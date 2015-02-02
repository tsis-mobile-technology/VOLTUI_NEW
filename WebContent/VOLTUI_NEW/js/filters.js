'use strict';

/* Filters */

angular.module('cpmApp.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }]).
  filter('menufilter', function() {
	  return function(items, search) {
	    if (!search) {
	      return items;
	    }
	    return items.filter(function(element, index, array) {
	        return element.UP_MENU_ID === search;
	      });
	  };
  }).
  filter('productTypeFilter', function() {
	  return function(items, search) {
	    if (!search) {
	      return items;
	    }
	    var group = search.optionGroup;
	    if (!group || '' === group) {
	      return items;
	    }
	    return items.filter(function(element, index, array) {
	        return element.group === search.optionGroup;
	      });
	  };
  });