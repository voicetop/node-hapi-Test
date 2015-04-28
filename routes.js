//handler설정 - request.params.name URL이므로 encodeURI 사용
var commonHandler = function (request, reply){
	request.log('info', 'Method : ' + request.params.method);
   	return reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
}


module.exports = function(server) {
	var routes = [
		{				//route 설정
			method: 'GET',				//'GET' method 방식
			path: '/',					//path 기본 '/'
			handler: function(request, reply){	//handler설정 -  request객체, reply객체를 이용한 응답 전달
				return reply('Hello, world!');
			}
		},
		{				//route 설정
	 		method: ['GET','PUT','POST'],		//'GET, PUT, POST' method 방식
	 		path: '/{method}/{name*}',			//path '/{name}' - 기본path 다음에 오는 url을 파라메터로 받음
	 		handler: commonHandler,
	 		config: {
	 				
	 		}
	 	}
	 ];

	 server.route(routes);

};
