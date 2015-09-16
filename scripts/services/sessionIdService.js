var app = angular.module('topicSurvey');

app.factory('sessionIdService', function() {
	return {
		generateSessionId: function( topic, subjectName, date ) {
			var sessionId = '',
				nameSplit = topic.topicName.split(' ');

			for (var i = 0; i < nameSplit.length; i++) {
				nameSplit[i].split('');

				sessionId += nameSplit[i][0];
			}

			var lectureDate = new Date(date),
				lectureDay = lectureDate.getDate(),
				lectureMonth = lectureDate.getMonth(),
				lectureYear = lectureDate.getFullYear();

			sessionId += lectureMonth;
			sessionId += lectureDay;
			sessionId += lectureYear;

			return sessionId;
		}
	}
})