var app = angular.module('topicSurvey');

app.service('openSurveyService', function( $http, fakeAuthService, homeService, connectionInfo ) {

	this.findOpenSurveys = function() {
		var user = localStorage.getItem('currentUser'),
			openSurveys = [];

		homeService.getParsedSurveys()
			.then(function( response ) {
				var surveyData = response.data;

				for (var i = 0; i < surveyData.length; i++) {
					for (var j = 0; j < surveyData[i].subject.recipientGroup.users.length; j++) {
						if (surveyData[i].subject.recipientGroup.users[j].email === user) {
							openSurveys.push(surveyData[i]);
						}
					}
				}
			})
			return openSurveys;
	}

	this.parseToFormlyData = function( survey ) {
		if (!survey) {
			return false;
		}
		
		var questions = survey.questions,
			formlyArray = [];

		for (var i = 0; i < questions.length; i++) {
			
			formlyArray.push({
				key: questions[i]._id,
				type: questions[i].questionType,
				templateOptions: {
					label: questions[i].titleText,
					description: questions[i].helpText,
				}
			})

			if (questions[i].questionType === 'radio' || questions[i].questionType === 'multiCheckbox') {
				formlyArray[i].templateOptions.options = [];
				for (var j = 0; j < questions[i].answers.length; j++) {
					formlyArray[i].templateOptions.options.push({
						name: questions[i].answers[j],
						value: questions[i].answers[j]
					})

					formlyArray[i].templateOptions.labelProp = 'name';
					formlyArray[i].templateOptions.valueProp = 'value';

				}
			}
		}
		return formlyArray;
	}

	this.changeSelectedSurvey = function( survey ) {
		localStorage.setItem('selectedSurvey', JSON.stringify(survey));
	}

	this.postCompletedSurvey = function( response, selectedSurvey ) {
		console.log(response);
		$http.put(connectionInfo.url + '/api/topic/results?id=' + selectedSurvey.topicId + '&subjectId=' + selectedSurvey.subject._id, response)
			.then(function(res) {
				console.log(res);
			})
	}
});

