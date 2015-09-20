var app = angular.module('topicSurvey');

app.service('homeService', function( $http, connectionInfo ) {

	this.getRecipientGroups = function() {
		return $http.get(connectionInfo.url + '/api/recipientGroups');
	}

	this.getSurveyTemplates = function() {
		return $http.get(connectionInfo.url + '/api/surveyTemplates');
	}

	this.getTopics = function() {
		return $http.get(connectionInfo.url + '/api/topic')
		// 	.then(function(res){
		// 	console.log(res.data[0].subjects[0].results);
		// 	var arr = res.data[0].subjects[0].results;
		// 	var questions = {};
		// 	for(var i = 0; i < arr.length; i++){
		// 		for(var k in arr[i][0]){
		// 			if(!questions.hasOwnProperty(k)) questions[k] = [];
		// 			questions[k].push(arr[i][0][k]);
		// 		}
		// 	}
		// 	console.log(questions);
		// 	return res;
		// });
	}

	this.getParsedSurveys = function() {
		return $http.get(connectionInfo.url + '/api/parsedSurveys')
	}

});

