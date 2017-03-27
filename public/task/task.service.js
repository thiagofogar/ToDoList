(function () {
  'use strict';

   angular
     .module('todo-app.task')
     .factory('TaskService', TaskService);

   TaskService.$inject = ['$http', 'constAPI'];

   function TaskService($http, constAPI) {
	   	var service = {
	   		getTaskList : getTaskList,
	   		getTaskById : getTaskById,
	   		postTask    : postTask,
	   		putTask     : putTask,
	   		delTask     : delTask,
	   		getStatusList : getStatusList
	   	};

	   	return service;
	   	////////////////////////////////////

	   	function getTaskList () {
	   		return $http.get(constAPI.URL +  '/tasks').then(handleSuccess, handleError);
	   	};

	   	function getTaskById (id) {
	   		return $http.get(constAPI.URL +  '/tasks/' + id).then(handleSuccess, handleError);
	   	};

	   	function postTask (tarefa) {
	   		return $http.post(constAPI.URL +  '/tasks', tarefa).then(handleSuccess, handleError);
	   	};

	   	function putTask (id, tarefa) {
			return $http.put(constAPI.URL +  '/tasks/' + id, tarefa).then(handleSuccess, handleError);
	   	};

	   	function delTask (id) {
	   		return $http.delete(constAPI.URL +  '/tasks/' + id).then(handleSuccess, handleError);
	   	};

	   	function getStatusList () {
	   		return [{id : 1, status: 'Created'}, 
	   		        {id : 2, status: 'In Progress'},
	   		        {id : 3, status: 'Completed'}
	   		       ];
	   	};

	   	// private functions
 
        function handleSuccess(res) {
            return res.data;
        }
 
        function handleError(res) {
            return $q.reject(res.data);
        }

   };

})();

