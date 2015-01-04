'use strict';

/* App Module */
var DragDropDirectives = angular.module('DragDropDirectives', []);

// each tool will build itself
DragDropDirectives.directive('tool', ['$document', function($document){
	return {
		restrict: "E",
		transclude: true,
		templateUrl: '/partials/tool.html',
		link: function($scope, $element, $attrs) {

		}
	};
}]);

DragDropDirectives.directive('field', ['$document', '$location', function($document, $location){
	return {
		restrict: "E",
		scope: {
			'field': '='
		},
		transclude: true,
		templateUrl: '/partials/tool.html',
		link: function($scope, $element, $attrs) {
			
			var field = $scope.field;
			var coords = field.coords;
			$element.css({
							'left': coords.left + 'px',
							'top': coords.top + 'px'
						});

			if( $location.path() == '/live' ) {
				var field_type = field.field_type;
				var ar_tag = field_type.split('|');
				var tag = ar_tag[0];
				var type = ar_tag[1];
				$element.html( '<'+tag+' type='+type+' />' );
			}
		}
	};
}]);

DragDropDirectives.directive('page', ['$document', function($document){
	return {
		restrict: "E",
		transclude: true,
		scope: {
			page: '='
		},
		templateUrl: '/partials/page.html',
		link: function($scope, $element, $attrs) {

			var page = $scope.page;
			$element.css({'background-image': 'url("' + page.background + '")' });
			$element.attr( 'page_number', page.page_number );


		}
	};
}]);

DragDropDirectives.directive('draggable', ['$document', '$rootScope', function($document, $rootScope){

	return {
		restrict: "A",
		scope: {
			field_type: '=type'
		},
		link: function($scope, $element, $attrs) {

			var startX = 0, startY = 0, x = 0, y = 0, dragTarget = false;

			var args = {
							cloneOnDrag: $attrs.cloneOnDrag,
							cloneOnDrop: $attrs.cloneOnDrop,
							dropTarget: $attrs.dropTarget
						};

			$element.on('mousedown', function(){

				$document.off('mousemove');
				$document.off('mouseup');
				startX = 0, startY = 0, x = 0, y = 0, dragTarget = false;

				event.preventDefault();

				var offsets = $element[0].getPosition();
				//var size = $element[0].getSize();

				startX = event.pageX - x - offsets.x;
				startY = event.pageY - y - offsets.y;

				dragTarget = (args.cloneOnDrag == 't') ? $element.clone() : $element;

				document.body.adopt( dragTarget[0] );

				dragTarget.addClass('dragging');

				$document.on('mousemove', function(event){ mousemove(event, dragTarget) });
				$document.on('mouseup', function(event){ mouseup(event, dragTarget) });
			});

			function mousemove(event, dragTarget) {

				y = event.pageY - startY;
				x = event.pageX - startX;

				dragTarget.css({
					top: y + 'px',
					left:  x + 'px'
				});
		    };

		    function mouseup(event, dragTarget) {

		    	$document.off('mousemove');
				$document.off('mouseup');

		    	// deal with parent
		    	console.error( 'deal with bad parent settings' );

		    	var dropTargets = $$('.' + args.dropTarget);

		    	var dropTarget = false;
		    	Array.each(dropTargets, function(target){
		    		var targetOffsets = target.getOffsets();
		    		var targetSize = target.getSize();
		    		if( event.pageX > targetOffsets.x &&
		    			event.pageX < targetSize.x + targetOffsets.x  &&
		    			event.pageY < targetSize.y + targetOffsets.y &&
		    			event.pageY > targetOffsets.y ) {
		    				dropTarget = target;
		    		}
		    	});

		    	if( !dropTarget ) {
		    		dragTarget.remove();
		    		return;
		    	}

		    	dragTarget.removeClass('dragging');

		    	if( args.cloneOnDrop == 't' ) {
		    		var clone = dragTarget.clone();
		    		dragTarget.remove();
		    		dragTarget = clone;
		    	}

		    	dropTarget.adopt( dragTarget[0] );

		    	console.error( 'deal with bounding' );

		    	var dropTargetOffsets = dropTarget.getOffsets();

		    	x = x - dropTargetOffsets.x - 1;
		    	y = y - dropTargetOffsets.y - 1;

		    	dragTarget.css({
		    		left: x + 'px',
		    		top: y + 'px'
		    	});

		    	$rootScope.$broadcast('on_drop', {'coords': {left: x, top: y}, 'page_number': dropTarget.get('page_number'), 'field_type': $scope.field_type});
		    };
		}
	};
}]);