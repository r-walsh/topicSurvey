var app = angular.module('topicSurvey');

app.controller('adminCtrl', function($scope, $location) {

	$scope.adminRedirect = function(location) {
		$location.url(location);
	}

	$scope.answerContainer = [''];
	$scope.varNameContainer = [''];

	$scope.addNewInput = function( model ) {
        $scope[ model ].push("");
	};

	$scope.removeInput = function(index, model) {
		console.log($scope[ model ]);
		$scope[ model ].splice(index, 1)
		console.log($scope[ model ]);
	}

});