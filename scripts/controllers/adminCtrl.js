var app = angular.module('topicSurvey');

app.controller('adminCtrl', function($scope, $location, adminService, homeService) {

	$scope.location = $location.path();

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
		adminService.addQuestion($scope.questions);
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

	$scope.parseSurvey = function( name, description, subject, replacementText ) {
		console.log(subject);

		var stringParseObject = {};

		for (var i = 0; i < $scope.selectedSurvey.varNames.length; i++) {
			stringParseObject[$scope.selectedSurvey.varNames[i]] = replacementText[i];
		}

		$scope.questions = $scope.selectedSurvey.questions.slice();

		$scope.confirmNewSurvey = adminService.parseSurvey( $scope.selectedTopic._id, $scope.selectedTopic.topicName, name, description, subject, $scope.questions, stringParseObject );

		$scope.questions = $scope.confirmNewSurvey.questions;
	}

	$scope.findQuestions = function( results, surveys ) {
		$scope.formattedResults = adminService.findQuestions(results, surveys);
	}



	////////POST

	$scope.postNewGroup = function() {
		adminService.postNewGroup($scope.recipientGroup)
			.then(function(res) {
				$scope.groupPosted = true;
				$scope.recipientGroup = {
					groupName: '',
					users: []
					}
			})
	}

	$scope.postNewTopic = function(topicName, subjectName, date, recipientGroup) {
		adminService.postNewTopic(topicName, subjectName, date, recipientGroup)
			.then(function(res) {
				$scope.topicPosted = true;
				$scope.topicName = '';
				$scope.subjectName = '';
				$scope.date = '';
				$scope.recipientGroup = '';
			})
	}

	$scope.addToExistingTopic = function(topic, subjectName, date, recipientGroup) {
		adminService.addToExistingTopic(topic, subjectName, date, recipientGroup)
			.then(function(res) {
				$scope.topicUpdated = true;
				$scope.topic = '';
				$scope.subjectName = '';
				$scope.date = '';
				$scope.recipientGroup = '';
			})
	}

	$scope.postSurveyTemplate = function(name, description, questions, varNames) {
		adminService.postSurveyTemplate(name, description, questions, varNames)
			.then(function(res) {
				$scope.surveyTemplatePosted = true;
				$scope.topicName = '';
				$scope.topicDescription = '';
				$scope.questions = [{
					titleText: '',
					helpText: '',
					answers: [''],
					questionType: ''
				}];
				$scope.varNameContainer = [''];
			})
	}

	$scope.postParsedSurvey = function() {
		adminService.postParsedSurvey($scope.confirmNewSurvey)
			.then(function(res) {
				$scope.surveySent = true;
				$scope.confirmNewSurvey = {};
				$scope.selectedSubject = null;
				$scope.publicName = '';
				$scope.selectedTopic = null;
				$scope.selectedSurvey = null;
			})
	}

	////////GET

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

	$scope.getParsedSurveys = function() {
		homeService.getParsedSurveys()
			.then(function(res) {
				$scope.parsedSurveys = res.data;
			})
	}()

	////////NG-MODEL STUFF

	$scope.datePickerDefault = new Date();

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

	$scope.replacementText = [];

});




