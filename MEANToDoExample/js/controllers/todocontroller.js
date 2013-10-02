'use strict';

myToDoApp.controller('todocontroller',
   function ($scope) {
    $scope.todos = [
    {text:'Learn MEAN stack development best practices', done:true},
    {text:'Build an amazing lean app on MEAN stack', done:false},
    {text:'Publish it on github', done:false}];

  $scope.addTodo = function() {
    $scope.todos.push({text:$scope.todoText, done:false});
    $scope.todoText = '';
  };

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };
}


);