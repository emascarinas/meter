(function(){
'use strict'

angular.module('meter',[]);

angular.module('meter')
.directive('emasMeter', emasMeter);

emasMeter.$inject=['$interval'];
function emasMeter($interval){
	return {
		restrict: 'EA',
		scope: {
			delaySpeed: '@'
		},
		templateUrl: 'meter.html',
		link: linkFn,
		replace: true
	};
	function linkFn(scope, el, attr){
		//i can use angular.element(document).find('.dial') for this too
		var dial = el.children(), rotateValue, subtractor;
		scope.rand = 0;
		
		$interval(function(){
			scope.rand = Math.floor((Math.random() * 180) + 0);
			// need to do a little adjustment to align the dial
			subtractor = scope.rand < 150 ? 2.60 : 2.68;
			rotateValue = -118 + (scope.rand/2) * subtractor;
			dial.css('transform','rotate('+(rotateValue)+'deg)');
			el.css('background-color', getColor(scope.rand));	
		},scope.delaySpeed);		
	}
	function getColor(value) {
			switch(true){
				case(value < 61):
					return 'green';
					break;
				case(value > 60 && value < 121):
					return 'orange';
					break;
				default:
					return 'red';
					break;
			}
	}

}
})();
