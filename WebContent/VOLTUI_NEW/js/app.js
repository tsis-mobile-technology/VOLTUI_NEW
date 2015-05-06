'use strict';

angular.module('cpmApp', [
  'ngRoute',
  'cpmApp.filters',
  'cpmApp.services',
  'cpmApp.directives',
  'cpmApp.controllers',
  'LocalStorageModule',
  'ngDialog'
  ]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/type01', {templateUrl: 'partials/template_type01.html', controller: 'CpmCtrl_type01'});
	$routeProvider.when('/type02', {templateUrl: 'partials/template_type02.html', controller: 'CpmCtrl_type02'});
	$routeProvider.when('/type03', {templateUrl: 'partials/template_type03.html', controller: 'CpmCtrl_type03'});
	$routeProvider.when('/type04', {templateUrl: 'partials/template_type04.html', controller: 'CpmCtrl_type04'});
	$routeProvider.when('/type05', {templateUrl: 'partials/template_type05.html', controller: 'CpmCtrl_type05'});
	$routeProvider.when('/type06', {templateUrl: 'partials/template_type06.html', controller: 'CpmCtrl_type06'});
	$routeProvider.when('/type07', {templateUrl: 'partials/template_type07.html', controller: 'CpmCtrl_type07'});
	$routeProvider.when('/dashboard',  {templateUrl: 'partials/template_dashboard.html',  controller: 'CpmCtrl_dashboard'});
	$routeProvider.when('/login',  {templateUrl: 'partials/template_login.html',  controller: 'CpmCtrl_login'});
	$routeProvider.otherwise({redirectTo: '/dashboard'});
}])
.config(function(localStorageServiceProvider){
	  localStorageServiceProvider.setPrefix('cpmApp');
	  // localStorageServiceProvider.setStorageCookieDomain('example.com');
	  localStorageServiceProvider.setStorageType('sessionStorage');
});