(function() {
    'use strict';

    angular
        .module('todo-app.task')
        .controller('TaskListController', TaskListController);

    TaskListController.$inject = ["$http", "$uibModal", "TaskService", "statusList", "taskList"];

    function TaskListController($http, $uibModal, TaskService, statusList, taskList) {
        var vm = this;

        vm.taskList = taskList;
        vm.statusList = statusList;

        vm.newTask = newTask;
        vm.editTask = editTask;
        vm.deleteTask = deleteTask;

        function newTask() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'task/task-edit.html',
                controller: 'TaskEditController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    statusList: function(TaskService) {
                        return TaskService.getStatusList();
                    },
                    selectedTask: function() {
                        return undefined;
                    }
                }
            });

            modalInstance.result.then(function(task) {
                vm.taskList.push(task);
            }, function() {});
        };

        function editTask(_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'task/task-edit.html',
                controller: 'TaskEditController',
                controllerAs: 'vm',
                size: 'lg',
                resolve: {
                    statusList: function(TaskService) {
                        return TaskService.getStatusList();
                    },
                    selectedTask: function(TaskService) {
                        return TaskService.getTaskById(_id);
                    }
                }
            });

            modalInstance.result.then(function(task) {
                var list = vm.taskList.map(function(el) {
                    if (el._id == task._id) {
                        return task;
                    }
                    return el;
                });
                vm.taskList = list;
            }, function() {});
        };

        function deleteTask(_id) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'task/task-delete.html',
                controller: 'TaskDeleteController',
                controllerAs: 'vm',
                size: 'sm',
                resolve: {
                    id: function() {
                        return _id;
                    }
                }
            });

            modalInstance.result.then(function(_id) {
                vm.taskList = vm.taskList.filter(function(el) {
                    return el._id !== _id
                });
            }, function() {});
        }
    };
})();