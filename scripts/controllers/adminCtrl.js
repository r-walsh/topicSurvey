var app = angular.module('topicSurvey');

app.controller('adminCtrl', function($scope, $location, adminService, homeService) {

	$scope.adminRedirect = function(location) {
		$location.url(location);
	}

	$scope.addNewInput = function( array ) {
        adminService.addNewInput( array );
	}

	$scope.removeInput = function(index, array) {
		adminService.removeInput(index, array);
	}

	$scope.addQuestion = function() {
		adminService.addQuestion($scope.questions)
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
		adminService.postSurveyTemplate(name, description, questions, varNames);
	}

	$scope.postNewGroup = function() {
		adminService.postNewGroup($scope.recipientGroup);
	}

	$scope.postNewTopic = function(topicName, subjectName, date, recipientGroup) {
		adminService.postNewTopic(topicName, subjectName, date, recipientGroup);
	}

	$scope.addToExistingTopic = function(topic, subjectName, date, recipientGroup) {
		adminService.addToExistingTopic(topic, subjectName, date, recipientGroup);
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

	$scope.varNameContainer = [''];

	$scope.recipientGroup = {
		groupName: '',
		users: []
	}

	$scope.newTopic = false;

	$scope.username = '';
	$scope.email = '';


});