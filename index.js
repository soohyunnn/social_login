let express = require("express"); //설치한 express module를 불러와서 변수(express)에 담습니다.
let app = express(); //express를 실행하여 app object를 초기화 합니다.

app.get("/", function (req, res) {
  // '/' 위치에 'get' 요청을 받는 경우,
  res.send("Hello World!"); //'Hello world!'를 보냅니다.
});

let port = 5000; //사용할 포트 번호를 port 변수에 넣습니다.
app.listen(port, function () {
  //port 변수를 이용하여 5000번 포트에 node.js 서버를 연결합니다.
  console.log("server on! http://localhost:" + port); //서버가 실행되면 콘솔창에 표시될 메시지입니다.
});
