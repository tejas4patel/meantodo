'use strict';

myToDoApp.controller('todocontroller',
   function ($scope, todosdata, tododata) {

  $scope.todos = todosdata.gettodos();

  $scope.addTodo = function() {
    tododata.posttodo({tasktext: $scope.todoText, done: false}, function(f) {
    $scope.todos = todosdata.gettodos();
    });      
  };

  $scope.$watch(function() { return angular.toJson( [ $scope.todos ] ) }, 
    function(newVal) { 
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      tododata.puttodo({tasktext: todo.text, done: todo.done});  
      count += todo.done=="false"? 1 : 0;
    });
    $scope.remaining = count;
  });

  $scope.archive = function() {
    todosdata.archivetodos(function(f) {
    $scope.todos = todosdata.gettodos(); 
    });       
  };

}


);