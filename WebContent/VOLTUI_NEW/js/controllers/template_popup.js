'use strict';

/* Controllers */
templateCtrl.controller('CpmCtrl_popup', ['$scope', 'ngDialog', function($scope, ngDialog) {
	var breedGrid;
	var breedProvider;
	var breedLoading;
	var breedform = [];
	$scope.onSearch = function() {
		console.log("melong 10000:" + $scope.breedform.name);
	};
//	setupGrid("grdBreed", "100%", "100%");
//	console.log("melong : ");
	RealGrids.onload = function(id) {
		console.log("melong1");
		breedGrid = new RealGrids.GridView(id);
		breedProvider = new RealGrids.LocalDataProvider();
		breedGrid.setDataProvider(breedProvider);
		var fields = [{fieldName: "key"},{fieldName: "code"},{fieldName: "name"}];
		breedProvider.setFields(fields);
		var columns = [{fieldName: "key",width: 40,header: { text: "key" },styles: { textAlignment: "far" }},
		               {fieldName: "code",width: 40,header: { text: "code" },styles: { textAlignment: "near" }},
					   {fieldName: "name",width: 120,header: { text: "name" },styles: { textAlignment: "near" }}];
        breedGrid.setColumns(columns);
        breedGrid.setOptions({panel: {visible: false},footer: {visible: false},checkBar: {visible: false},statesBar: {visible: false},
            edit: {insertable: false,appendable: false,updatable: false,deletable: false}});
        breedGrid.onDataCellClicked = function(id, index) {setBreedData();};
        
        breedProvider.loadData({
	        type: "json",
	        method: "post",
	        url: "http://localhost:8080/test-web/breed.jsp",
	        progress: true
	    }, function (provider) {
	        var count = provider.getRowCount();
	        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
	        setBreedLoading(false);
	        grdBreed.setFocus();
	    }, function (provider, message) {
	        $("#loadResult").css("color", "red").text("Load failed: " + message).show();
	        setBreedLoading(false);
	    });
	};
	function setBreedData(id, index) {
        var row = 0;
        var current = grdBreed.getCurrent();
     
        if (current) {
            row = Math.max(0, current.dataRow);
        }
        $scope.breedform = [];
    	$scope.breedform = breedProvider.getJsonRow(row);
    	$scope.$apply();
    }
	function setBreedLoading(v) {
        if (v != breedLoading) {
        	breedLoading = v;

            // data load가 시작되면 편집을 못하게 한다.
        	breedGrid.setEditOptions({
                readOnly: breedLoading
            });
        }
    }
	
	setTimeout(function () {
		setupGrid("grdBreed", "100%", "100%");
		console.log("melong : ");
	}, 1000);
}]);

templateCtrl.controller('CpmCtrl_popup_save', ['$scope', 'ngDialog', function($scope, ngDialog) {
	var breedGrid;
	var breedProvider;
	var breedLoading;
	var breedform = [];
	$scope.onSearch = function() {
		console.log("melong 10000:" + $scope.breedform.name);
		alert("melong 100:"+ $scope.breedform.name);
		ngDialog.open({
			template: 'partials/popup/popup02.html',
			className: 'ngdialog-theme-plain',
			scope: $scope,
			cache: false,
			closeByDocument: false,
			closeByEscape: false,
			controller: 'CpmCtrl_popup_save_sub'
		});
	};

	RealGrids.onload = function(id) {
		console.log("melong1");
		breedGrid = new RealGrids.GridView(id);
		breedProvider = new RealGrids.LocalDataProvider();
		breedGrid.setDataProvider(breedProvider);
		var fields = [{fieldName: "key"},{fieldName: "code"},{fieldName: "name"}];
		breedProvider.setFields(fields);
		var columns = [{fieldName: "key",width: 40,header: { text: "key" },styles: { textAlignment: "far" }},
		               {fieldName: "code",width: 40,header: { text: "code" },styles: { textAlignment: "near" }},
					   {fieldName: "name",width: 120,header: { text: "name" },styles: { textAlignment: "near" }}];
        breedGrid.setColumns(columns);
        breedGrid.setOptions({panel: {visible: false},footer: {visible: false},checkBar: {visible: false},statesBar: {visible: false},
            edit: {insertable: false,appendable: false,updatable: false,deletable: false}});
        breedGrid.onDataCellClicked = function(id, index) {setBreedData();};
        
        breedProvider.loadData({
	        type: "json",
	        method: "post",
	        url: "http://localhost:8080/test-web/product_kind.jsp",
	        progress: true
	    }, function (provider) {
	        var count = provider.getRowCount();
	        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
	        setBreedLoading(false);
	        grdBreed.setFocus();
	    }, function (provider, message) {
	        $("#loadResult").css("color", "red").text("Load failed: " + message).show();
	        setBreedLoading(false);
	    });
	};
	function setBreedData(id, index) {
        var row = 0;
        var current = grdBreed.getCurrent();
     
        if (current) {
            row = Math.max(0, current.dataRow);
        }
        $scope.breedform = [];
    	$scope.breedform = breedProvider.getJsonRow(row);
    	$scope.$apply();
    }
	function setBreedLoading(v) {
        if (v != breedLoading) {
        	breedLoading = v;

            // data load가 시작되면 편집을 못하게 한다.
        	breedGrid.setEditOptions({
                readOnly: breedLoading
            });
        }
    }
	
	setTimeout(function () {
		setupGrid("grdBreed", "100%", "100%");
	}, 1000);
}]);

templateCtrl.controller('CpmCtrl_popup_save_sub', ['$scope', 'ngDialog', function($scope, ngDialog) {
	var breedGrid;
	var breedProvider;
	var breedLoading;
	var breedform = [];
	$scope.onSearch = function() {
		console.log("melong sub:" + $scope.breedformsub.name);
		alert("melong sub:"+ $scope.breedformsub.name);
		$scope.breedform.subname = $scope.breedformsub.name + "(" + $scope.breedformsub.code + ")";
	};

	RealGrids.onload = function(id) {
		console.log("melong1");
		breedGrid = new RealGrids.GridView(id);
		breedProvider = new RealGrids.LocalDataProvider();
		breedGrid.setDataProvider(breedProvider);
		var fields = [{fieldName: "key"},{fieldName: "code"},{fieldName: "name"}];
		breedProvider.setFields(fields);
		var columns = [{fieldName: "key",width: 40,header: { text: "key" },styles: { textAlignment: "far" }},
		               {fieldName: "code",width: 40,header: { text: "code" },styles: { textAlignment: "near" }},
					   {fieldName: "name",width: 120,header: { text: "name" },styles: { textAlignment: "near" }}];
        breedGrid.setColumns(columns);
        breedGrid.setOptions({panel: {visible: false},footer: {visible: false},checkBar: {visible: false},statesBar: {visible: false},
            edit: {insertable: false,appendable: false,updatable: false,deletable: false}});
        breedGrid.onDataCellClicked = function(id, index) {setBreedData();};
        
        breedProvider.loadData({
	        type: "json",
	        method: "post",
	        url: "http://localhost:8080/test-web/product_type_sub.jsp",
	        progress: true
	    }, function (provider) {
	        var count = provider.getRowCount();
	        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
	        setBreedLoading(false);
	        grdBreedSub.setFocus();
	    }, function (provider, message) {
	        $("#loadResult").css("color", "red").text("Load failed: " + message).show();
	        setBreedLoading(false);
	    });
	};
	function setBreedData(id, index) {
        var row = 0;
        var current = grdBreedSub.getCurrent();
     
        if (current) {
            row = Math.max(0, current.dataRow);
        }
        $scope.breedformsub = [];
    	$scope.breedformsub = breedProvider.getJsonRow(row);
    	$scope.$apply();
    }
	function setBreedLoading(v) {
        if (v != breedLoading) {
        	breedLoading = v;

            // data load가 시작되면 편집을 못하게 한다.
        	breedGrid.setEditOptions({
                readOnly: breedLoading
            });
        }
    }
	
	setTimeout(function () {
		setupGrid("grdBreedSub", "100%", "100%");
	}, 1000);
}]);