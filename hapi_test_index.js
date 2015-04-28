/**
***  hapi sample server
**/

// 1. 모듈 로드
var Hapi = require('hapi');	         //-->  node_modules/hapi 모듈 로드
var Good = require('good');		       //-->  node_moudles/good 모듈 로드

// 2. 서버 객체 생성
var server = new Hapi.Server();		//Hapi Server 객체생성
server.connection({ port: 8080 });	//서버 port 설정

// 3. routes 설정
require('./routes.js')(server); //routes.js import 미리 route 선언 해둔 파일

// 4. 서버 plugin 추가 및 시작
server.register({
  register: Good,				//good module
  options: {
   reporters: [{
     reporter: require('good-console'),		//good-console module
     events: {
       request: '*',
       response: '*',			//reponse의 모든 이벤트
       log: '*'					  //log의 모든 이벤트
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

