'use strict';

/* Controllers */
var templateCtrl = angular.module('cpmApp.controllers', []);

templateCtrl.controller('MenuCtrl_cpmApp', ['$scope', '$location', '$route', '$routeParams', '$rootScope', 'requestHTTP', 'localStorageService', function($scope, $location, $route, $routeParams, $rootScope, requestHTTP, localStorageService){
	    function init(){
	    	console.log("init");
	    }

	    $scope.oneDepth = function () {
	    	console.log("goOnDepth:" );
	    	$scope.rootMenuId = "00000";
        	$scope.twoDepthMenuId = "G0000"; 
        	
	    	if($scope.menuLists == null)
	    		$scope.menuLists = localStorageService.get('menuLists');

	    	$scope.storageType = 'Local storage';

	        if (localStorageService.getStorageType().indexOf('session') >= 0) {
	          $scope.storageType = 'Session storage';
	        }

	        if (!localStorageService.isSupported) {
	          $scope.storageType = 'Cookie';
	        }
	    	
	    	function setDaoJSONResult(result, status, headers, config) {
//	    		$scope.menuLists = result;
	    		localStorageService.remove('menuLists');
	    		localStorageService.set('menuLists',result);
	        	$scope.menuLists = localStorageService.get('menuLists');
	        	console.log("get db");
	        }
	        
	        function onStatsChart2Fail(data, status, headers, config) {
	            console.log("call error");
	        }
	    	// get data
	        if($scope.menuLists == null) {
	        	console.log("get munuLists");
	        	requestHTTP.getJsonCrossdomainCallback("/test-web/menu2.jsp", "", setDaoJSONResult, onStatsChart2Fail);
	        }
	        
	    };

	    $scope.goVOLTUI = function() {
	    	console.log("goVOLTUI");
	        document.location.href = "/test-web/VOLTUI_NEW/";
	    };
	    
	    $scope.goContents = function (MENU_ID, PROG_NAME, SAV_BTN, URL) {
	    	console.log("goContents:" + MENU_ID + "," + URL+ "," + SAV_BTN);
	    	$scope.pageTitle = PROG_NAME + "(" + MENU_ID + ")";
	    	$scope.SAV_BTN = SAV_BTN;
	    	$location.path("/" + MENU_ID);
	    	
	    };
	    
	    $scope.goTwoDepth = function(MENU_ID) {
	    	console.log("goTwoDepth:" + MENU_ID);
	    	$scope.twoDepthMenuId = MENU_ID;
	    };
	    
	    $scope.goThreeDepth = function() {
	    	$('.menu-title').off('click').on('click', function () {
                $('.menu-title').removeClass('active');
                $(this).addClass('active');
                $('.caret').removeClass('caret-up');
                $('.depth-1, .depth-2').hide();
                $(this).find('.caret').addClass('caret-up');
                $(this).next('.depth-1').show();
            });
	    	$('.depth-1').children('li').off('click').on('click', function () {
                $(this).children('.depth-2').show();
            });
	    	$('.depth-2').children('li').off('click').on('click', function () {
	            $('.depth-2').children('li').removeClass('active');
	        });  
	    };

		$scope.$on('$routeChangeSuccess', function(next, current) { });
		$scope.$on('$routeUpdate', function(next, current) { });
		$scope.$on('$routeChangeStart', function(next, current) { });
		$scope.$on('$locationChangeSuccess', function(next, current) { });
		$scope.$on('$locationChangeStart', function(next, current) { });
		$scope.$on('$includeContentRequested', function(next, current) { });
		$scope.$on('$includeContentLoaded', function(next, current) { 
			init();
//			setupGrid("grdMain", "100%", "500px");
		});	

	}]);