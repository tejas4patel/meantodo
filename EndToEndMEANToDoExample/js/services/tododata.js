
myToDoApp.factory('tododata', function($resource){
	var tododata = $resource('/todo/:tasktext/:done',  
  			{tasktext:'@tasktext', done:'@done'},  {
            posttodo: { method: 'POST' },  
            puttodo: { method: 'PUT' }
        });
	return tododata;
});
