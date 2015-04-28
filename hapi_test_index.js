/**
***  hapi sample server
**/

// 1. hapi 모듈 로드
var Hapi = require('hapi');	        //-->  node_modules/hapi 모듈 로드
var Good = require('good');		//-->  node_moudles/good 모듈 로드

// 2. 서버 객체 생성
var server = new Hapi.Server();		//Hapi Server 객체생성
server.connection({ port: 8080 });	//서버 port 설정

// 3. routes 설정
server.route({				//route 설정
 method: 'GET',				//'GET' method 방식
 path: '/',				//path 기본 '/'
 handler: function(request, reply){	//handler설정 -  request객체, reply객체를 이용한 응답 전달
  reply('Hello, world!');
 }
});

server.route({				//route 설정
 method: 'GET',				//'GET' method 방식
 path: '/{name}',			//path '/{name}' - 기본path 다음에 오는 url을 파라메터로 받음
 handler: function(request, reply){	//handler설정 - request.params.name URL이므로 encodeURI 사용
  reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
 }
});


// 4. 서버 plugin 추가 및 시작
server.register({
  register: Good,				//good module
  options: {
   reporters: [{
     reporter: require('good-console'),		//good-console module
     events: {
       response: '*',				//reponse의 모든 이벤트
       log: '*'					//log의 모든 이벤트
     }
   }]
  }
}, function(err){
   if(err){
      throw err;     //plugin load fail
   }

   server.start(function(){    //서버 시작 후 callback method 실행
	server.log('info', 'Server running at: ' + server.info.uri);		//console.log에서 server.log('info',)로 변경
   });
});

