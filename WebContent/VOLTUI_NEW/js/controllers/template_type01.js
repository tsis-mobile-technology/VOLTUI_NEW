'use strict';

/* Controllers */
templateCtrl.controller('CpmCtrl_type01', ['$scope', 'ngDialog', function($scope, ngDialog){
	
	//Dialog example
	$scope.dialogTest = function(flag) {
		if(flag == "save") {
			console.log("saving button click");
			ngDialog.open({
				template: 'partials/popup/popup01.html',
				className: 'ngdialog-theme-plain',
				scope: $scope,
				cache: false,
				closeByDocument: false,
				closeByEscape: false
			});
		}
		else if(flag == "clear") {
			console.log("clear button click");
			$scope.plainPopupTitleText = "테스트 팝업";
			$scope.plainPopupContentText = "내용은 여기에 입력하세요!(2초 후 사라집니다.)";
			var dialog = ngDialog.open({
				template: 'partials/popup/plainPopup.html',
				className: 'ngdialog-theme-plain',
				scope: $scope,
				closeByDocument: false,
				closeByEscape: false
			});
			setTimeout(function () {
				dialog.close();
			}, 2000);
		}
		else if(flag == "delete") {
			console.log("delete button click");
			ngDialog.open({
				template: 'partials/popup/popup01.html',
				className: 'ngdialog-theme-plain',
				scope: $scope,
				cache: false,
				closeByDocument: false,
				closeByEscape: false,
				controller: 'CpmCtrl_popup'
			});
		}

	};
	
    // RealGrid variables
    var mainGrid;
    var mainProvider;
    var loading;
    // object element insert at div element
    // tagId(grdMain) named element is must exists in body 
    setupGrid("grdMain", "100%", "500px"); 

    RealGrids.onload = function (id) {
        console && console.log("==> RealGrid loaded.(" + id + ")");
        
        mainGrid = new RealGrids.GridView(id);
        mainProvider = new RealGrids.LocalDataProvider();
        mainGrid.setDataProvider(mainProvider); 
        
        setFields(mainProvider);
        setColumns(mainGrid);
        setOptions(mainGrid);
        
        loadData();
    }
    
    // Action Two : Input Data setting
    function setData() {
        var row = 0;
        var current = grdMain.getCurrent();
     
        if (current) {
            row = Math.max(0, current.dataRow);
        }
     
        var v = mainProvider.getJsonRow(row);
        console.log(row + " => " + JSON.stringify(v));
        $scope.gridform = [];
    	$scope.gridform = mainProvider.getJsonRow(row);
    	console.log($scope.gridform.com_id);
    	
    	$scope.$apply();
    }
    
    // Date Initial setting
    $scope.search_text = new Date();
    $scope.search = function(search_text) {
    	var today = $filter('date')($scope.search_text, 'yyyyMMdd');
    	alert("날짜 선택은? " + today);
    };
    
    $scope.init = function (action_two) {

    	var r = confirm("데이터를 초기화 하시겠습니까?");
    	if (r == true) {
    		$scope.gridform = [];
    		grdMain.cancel();
    		mainProvider.rollback();
    	} 
    };

    $scope.save = function () {
    	$templateCache.put('templateId.html', 'This is the content of the template');
    };
    
    function setFields(provider) {
        // json array for data fields
        var fields = [
        	{fieldName: "com_id",datType: "text"}, 
            {fieldName: "spec_gbn"}, 
            {fieldName: "proc_st"}, 
            {fieldName: "input_date"},
            {fieldName: "out_date"},
            {fieldName: "spec_cd"},
            {fieldName: "wrk_ttl"}
            ];
        if (provider == mainProvider)
            provider.setFields(fields);
        // If there's more provider then add else if code
    } 
    
    function setColumns(grid) {
        // json array for grid columns
        // fieldName is must exists data provider fields
        var columns = [{
            fieldName: "com_id",
            width: 90,
            header: { text: "com_id" },
            styles: { textAlignment: "far" }
        }, {
                fieldName: "spec_gbn",
            width: 80,
            header: { text: "spec_gbn" },
            styles: { textAlignment: "near" }
        }, {
            fieldName: "proc_st",
            width: 100,
            header: { text: "proc_st" },
            styles: { textAlignment: "near" }
        }, {
            fieldName: "input_date",
            width: 80,
            header: { text: "input_date" },
            styles: { textAlignment: "near" }
        }, {
            fieldName: "out_date",
            width: 150,
            header: { text: "out_date" },
            styles: { textAlignment: "near" }
        }, {
            fieldName: "spec_cd",
            width: 250,
            header: { text: "spec_cd" },
            styles: { textAlignment: "near" }
        }, {
            fieldName: "wrk_ttl",
            width: 150,
            header: { text: "wrk_ttl" },
            styles: { textAlignment: "near" }
        }];

        if (grid == mainGrid)
            grid.setColumns(columns);
        // If there's more grid then add else if code
    }       
    
    function setOptions(grid) {
        grid.setOptions({
            panel: {
                visible: true
            },
            footer: {
                visible: true
            },
            checkBar: {
                visible: true
            },
            statesBar: {
                visible: true
            },
            edit: {
                insertable: true,
                appendable: true,
                updatable: true,
                deletable: true,
                deleteRowsConfirm: true,
                deleteRowsMessage: "Are you sure?"          
            },          
        });
        grid.onDataCellClicked = function(id, index) {
        	setData();
        }
    }
    
    function setLoading(v) {
        if (v != loading) {
            loading = v;

            // data load가 시작되면 편집을 못하게 한다.
            grdMain.setEditOptions({
                readOnly: loading
            });
        }
    }
    
    function loadData() {
  	
    	mainProvider.loadData({
    	        type: "json",
    	        method: "post",
    	        url: "http://localhost:8080/test-web/sample1.jsp",
    	        progress: true
    	    }, function (provider) {
    	        var count = provider.getRowCount();
    	        $("#loadResult").css("color", "green").text(parseInt(count).toLocaleString() + " rows loaded.").show();
    	        setLoading(false);
    	        grdMain.setFocus();
    	    }, function (provider, message) {
    	        $("#loadResult").css("color", "red").text("Load failed: " + message).show();
    	        setLoading(false);
    	    });
    }    
}]);