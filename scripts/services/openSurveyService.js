var app = angular.module('topicSurvey');

app.service('openSurveyService', function( $http, fakeAuthService, homeService ) {

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
							console.log(openSurveys)
						}
					}
				}
			})
			return openSurveys;
		}

	this.changeSelectedSurvey = function( survey ) {
		localStorage.setItem('selectedSurvey', JSON.stringify(survey));
	}

	this.postCompletedSurvey = function( response, selectedSurvey ) {
		console.log(selectedSurvey.subject._id);
		$http.put('http://0.0.0.0:8000/api/topic/results?id=' + selectedSurvey.topicId + '&subjectId=' + selectedSurvey.subject._id, response)
			.then(function(res) {
				console.log(res);
			})
	}
});