var app = angular.module('topicSurvey');

app.service('fakeAuthService', function() {

	this.setCurrentUser = function( email ) {
		localStorage.setItem('currentUser', email);
	}

});