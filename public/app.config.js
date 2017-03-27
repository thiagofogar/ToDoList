(function() {
	'use strict';

	angular
		.module('todo-app')
	  	.config(config);

	function config($routeProvider, $locationProvider) {
		$routeProvider
		    .when('/task', {
		    	templateUrl: 'task/task-list.html',
		    	controller: 'TaskListController',
		    	controllerAs : 'vm',
		    	resolve: {
	        		taskList: function(TaskService) {
	        	   		return TaskService.getTaskList();
	        	  	},
	        	  	statusList : function(TaskService) {
		    			return TaskService.getStatusList();
		            }
		        }
		    })
		    .otherwise({
		    	redirectTo : '/task'
		    });

		    $locationProvider.html5Mode(true).hashPrefix("!");
	};

})();