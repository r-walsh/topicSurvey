var app = angular.module('topicSurvey');

app.controller('adminCtrl', function($scope, $location, homeService) {

	$scope.adminRedirect = function(location) {
		$location.url(location);
	}

	$scope.varNameContainer = [''];

	$scope.addNewInput = function( array ) {
        array.push("");
	}

	$scope.removeInput = function(index, array) {
		array.splice(index, 1);
	}

	$scope.addQuestion = function() {
		$scope.questions.push({
			titleText: '',
			helpText: '',
			answers: [''],
			questionType: ''
		})
	}

	$scope.UserObj = function(name, email) {
		this.name = name;
		this.email = email;
	}

	$scope.addUser = function() {
		$scope.recipientGroup.users.push(new $scope.UserObj($scope.username, $scope.email));

		$scope.username = '';
		$scope.email = '';
			
	}

	$scope.postSurveyTemplate = function(name, description, questions, varNames) {
		homeService.postSurveyTemplate(name, description, questions, varNames);
	}

	$scope.postNewGroup = function() {
		homeService.postNewGroup($scope.recipientGroup);
	}

	$scope.questions = [{
		titleText: '',
		helpText: '',
		answers: [''],
		questionType: ''
	}]

	$scope.recipientGroup = {
		groupName: '',
		users: []
	}


});