
myToDoApp.factory('todosdata', function($resource){
	var todosdata = $resource('todos',  
  			{},  {
            gettodos: { method: 'GET' , isArray:true},  
            archivetodos: { method: 'DELETE' }
        });
	return todosdata;
});
