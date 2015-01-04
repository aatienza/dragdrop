'use strict';

/* App Module */
var DragDropControllers = angular.module('DragDropControllers', []);

DragDropControllers.controller("editController", ['$scope', '$window', 'Fields', 'Pages', function($scope, $window, Fields, Pages) {
	
	$scope.tools = [
					{field_type: 'input|text', text:'Text Field'},
					{field_type: 'input|checkbox', text: 'Checkbox'}
					];

	var onPageLoad = function( args ) {
		var pages = args.data;
		$scope.pages = pages;
	}
	Pages.getPages( onPageLoad );

	$scope.$on('on_drop', function( event, args ) {
		Fields.addField( args );
	});

	$scope.liveView = function() {
		$window.location.href = '/live';
	};

	$scope.clearFields = function() {
		Fields.clearFields();
	}

}]);

DragDropControllers.controller("liveController", ['$scope', '$window', 'Pages', function($scope, $window, Pages) {

	var onPageLoad = function( args ) {
		var pages = args.data;
		$scope.pages = pages;
	}
	Pages.getPages( onPageLoad );

	$scope.editView = function() {
		$window.location.href = '/';
	};


}]);