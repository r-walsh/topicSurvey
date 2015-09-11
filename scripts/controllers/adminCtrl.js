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

	$scope.currentRecipientIndex = 0;
	$scope.addUser = function() {
		$scope.recipientGroup.users[$scope.currentRecipientIndex].name = $scope.username;
		$scope.recipientGroup.users[$scope.currentRecipientIndex].email = $scope.email;

		$scope.recipientGroup.users.push({ name: '', email: '' });

		$scope.currentRecipientIndex++;
		$scope.username = '';
		$scope.email = '';
			
	}

	$scope.postSurveyTemplate = function(name, description, questions, varNames) {
		homeService.postSurveyTemplate(name, description, questions, varNames);
	}

	$scope.checkValidUser = function() {
		if ($scope.name !== '' && $scope.email !== '') {
			return false;
		}
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
		users: [{
			name: '',
			email: ''
		}]
	}

	$scope.username = '';
	$scope.email = '';

});