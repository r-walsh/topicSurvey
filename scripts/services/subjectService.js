var app = angular.module('topicSurvey');

app.factory('subjectService', function(sessionIdService) {
	return {
		SubjectTemplate: function( topic, subjectName, date, recipientGroup ) {
			this.subjectName = subjectName;
			this.date = new Date(date);
			this.recipientGroup = recipientGroup;
			this.sessionId = sessionIdService.generateSessionId(topic, this.subjectName, date);
			this.results = [];
		}
	}
});