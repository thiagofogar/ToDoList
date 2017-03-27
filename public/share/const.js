(function() {
	'use strict;'

	angular
		.module('todo-app')
		.constant('constAPI', {
			URL : 'http://192.168.16.101:8080/api'
		});
     
})();