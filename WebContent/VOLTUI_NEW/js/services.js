'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('cpmApp.services', []).
  value('version', '0.1').
  value('appname', 'VOLT UI').
  factory('requestHTTP', ['$rootScope', '$http', function($rootScope, $http) {
		var factory = {};
	  factory.getJsonCrossdomain = function(url, param) {
	      $http({
	          method      : 'GET',
	          url         : url + param,
	          dataType    : 'json',
	          crossDomain : true,
	          timeout     : 5000,
	          header      : {
	                  'Access-Control-Allow-Origin': '*', //'http://59.12.238.193:8080',
	                  'Access-Control-Allow-Headers': 'GET, POST, PUT, DELETE, OPTIONS',
	                  'Access-Control-Allow-Methods': 'Origin Accept Content-Type X-Requested-With X-CSRF-Token'}
	      }).
	      success(function(data, status, headers, config) {
	          console.log("requestGetJsonCrossdomain:url:" + url);
	          console.log("requestGetJsonCrossdomain:param:" + param);
	          console.log("requestGetJsonCrossdomain:data:" + data);
	          // console.log("requestGetJsonCrossdomain:status:" + status);
	          // console.log("requestGetJsonCrossdomain:headers:" + headers);
	          // console.log("requestGetJsonCrossdomain:config:" + config);    
	          return data;
	      }).
	      error(function(data, status, headers, config) {
	          console.log("requestGetJsonCrossdomain:url:" + url);
	          console.log("requestGetJsonCrossdomain:param:" + param);
	          // console.log("requestGetJsonCrossdomain:data:" + data);
	          // console.log("requestGetJsonCrossdomain:status:" + status);
	          // console.log("requestGetJsonCrossdomain:headers:" + headers);
	          // console.log("requestGetJsonCrossdomain:config:" + config);
	          return status;
	      });
	  };

	  factory.getJsonCrossdomainCallback = function(url, param, callback, failback) {
	      $http({
	          method      : 'GET',
	          url         : url + param,
	          dataType    : 'json',
	          crossDomain : true,
	          timeout     : 30000,
	          header      : {
	                  'Access-Control-Allow-Origin': '*', //'http://59.12.238.193:8080',
	                  'Access-Control-Allow-Headers': 'GET, POST, PUT, DELETE, OPTIONS',
	                  'Access-Control-Allow-Methods': 'Origin Accept Content-Type X-Requested-With X-CSRF-Token'}
	      }).
	      success(function(data, status, headers, config) {
	    	  console.log("Response : " + data._error);
	      }).
	      success(callback).
	      error(failback);
	  };
	  
	  factory.postJsonCrossdomainCallback = function(url, data, callback, failback) {
	      $http({
	          method      : 'POST',
	          url         : url,
	          dataType    : 'json',
	          data        : data,
	          crossDomain : true,
	          timeout     : 30000,
	          header      : {
	                  'Access-Control-Allow-Origin': '*', //'http://59.12.238.193:8080',
	                  'Access-Control-Allow-Headers': 'GET, POST, PUT, DELETE, OPTIONS',
	                  'Access-Control-Allow-Methods': 'Origin Accept Content-Type X-Requested-With X-CSRF-Token'}
	      }).
	      success(function(data, status, headers, config) {
	    	  console.log("Response : " + data._error);
	      }).
	      success(callback).
	      error(failback);
	  };

	  return factory;
	}])
	.service('fileUpload', ['$http', function ($http) {
	    this.uploadFileToUrl = function(file, uploadUrl){
	        var fd = new FormData();
	        if(file != null ) {
	        fd.append('file', file);
	        $http.post(uploadUrl, fd, {
	            transformRequest: angular.identity,
	            headers: {'Content-Type': undefined}
	        })
	        .success(function(data, status, headers, config) {
	        	console.log("fileUpload:Success");
		    	console.log("fileUpload:url:" + uploadUrl);
		    	alert("파일 업로드가 완료 되었습니다!");
	        })
	        .error(function(data, status, headers, config) {
	        	console.log("fileUpload:Error");  
	        	console.log("fileUpload:url:" + uploadUrl);
		        console.log("fileUpload:status:" + status);
		        alert("파일 업로드가 실패 하였습니다.");
		        return status;
		      });
	        }
	        else {
	        	alert("파일이 선택되지 않았습니다!");
	        }
	    }
	}]);