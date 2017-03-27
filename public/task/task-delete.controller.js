(function() {
	'use strict';

	angular
		.module('todo-app.task')
		.controller('TaskDeleteController', TaskDeleteController);

		function TaskDeleteController(TaskService, $uibModalInstance, id) {
			var vm = this;

			vm.deleteTask = deleteTask;
			vm.cancel = cancel;

			function deleteTask() {
				TaskService.delTask(id)
					.then(function (response) {
						$uibModalInstance.close(id);
					})
					.catch(function (response) {
						alert("Error: " + response)
					});
			};

			function cancel() {
				$uibModalInstance.dismiss('cancel');
			};
		};

})();