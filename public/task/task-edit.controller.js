(function() {
	'use strict';

	angular
		.module('todo-app.task')
		.controller('TaskEditController', TaskEditController);

		TaskEditController.$inject = ["TaskService", "$location", "$uibModalInstance", "selectedTask", "statusList"]

		function TaskEditController(TaskService, $location, $uibModalInstance, selectedTask, statusList) {
			var vm = this;

			vm.title =  selectedTask ? "Edit Task" : "New Task";
			vm.statusList = statusList;
			vm.task = selectedTask === undefined ? {} : selectedTask;

			//show the selected values when is in edit mode
			vm.task.status = selectedTask === undefined ? undefined : statusList[selectedTask.status - 1];
			vm.task.dueDate = selectedTask === undefined ? undefined : new Date(selectedTask.dueDate);
			
			vm.saveTask = saveTask;
			vm.closeModal = closeModal;
			vm.showCalendar = showCalendar;
			vm.clearForm = clearForm;

			function saveTask(task) {
				if(selectedTask) {
					task.status = vm.task.status.id;
					TaskService.putTask(task._id, task)
						.then(function (response) {
							$uibModalInstance.close(vm.task); //return the selected task
						})
						.catch(function (response) {
							alert("Error: " + response)
						});
				} else {
					task.status = vm.task.status.id;
					TaskService.postTask(task)
						.then(function (response) {
							$uibModalInstance.close(response);
						})
						.catch(function (response) {
							alert("Error: " + response)
						});
				}
			};

			function closeModal() {
         	   $uibModalInstance.dismiss('cancel');
        	}

			function showCalendar () {
				vm.calendarioAberto = true;
			}

			function clearForm() {
				vm.task = {};
			}
		}
})();