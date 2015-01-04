'use strict';

/* App Module */
var DragDropServices = angular.module('DragDropServices', []);

DragDropServices.factory("Fields", ['$http', function($http){

	var addField = function( args ) {

		return $http.post('/addField', args);
	
	};

	var clearFields = function() {
		$$('field').dispose();
		return $http.post('/clearFields');
	};

	return {
		addField: addField,
		clearFields: clearFields
	};
}]);

DragDropServices.factory("Pages", ['$http', function($http){

	var getPages = function( onSuccess ) {

		return $http.post('/getPages').then( onSuccess );
	
	};

	return {
		getPages: getPages
	};
}]);