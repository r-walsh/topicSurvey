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

		var inputBox = angular.element(document.querySelector('#user-name-input'));
		inputBox[0].focus();
			
	}

	$scope.postSurveyTemplate = function(name, description, questions, varNames) {
		homeService.postSurveyTemplate(name, description, questions, varNames);
	}

	$scope.postNewGroup = function() {
		homeService.postNewGroup($scope.recipientGroup);
	}

	$scope.postNewTopic = function(topicName, subjectName, date, recipientGroup) {
		homeService.postNewTopic(topicName, subjectName, date, recipientGroup);
	}

	$scope.addToExistingTopic = function(topicId, subjectName, date, recipientGroup) {
		homeService.addToExistingTopic(topicId, subjectName, date, recipientGroup);
	}

	$scope.getRecipientGroups = function() {
		homeService.getRecipientGroups()
			.then(function(res) {
				$scope.recipientGroups = res.data;
			})
	}()

	$scope.getSurveyTemplates = function() {
		homeService.getSurveyTemplates()
			.then(function(res) {
				$scope.surveyTemplates = res.data;
			})
	}()

	$scope.getTopics = function() {
		homeService.getTopics()
			.then(function(res) {
				$scope.topics = res.data;
			})
	}()

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

	$scope.newTopic = false;


});