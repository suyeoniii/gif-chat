const WebSocket = require("ws");

module.exports = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws, req) => {
    //웹 소켓과 연결 맺을 때 발생하는 이벤트
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("새로운 클라이언트 접속", ip);
    ws.on("message", (message) => {
      console.log(message);
    });
    ws.on("error", (error) => {
      console.error(error);
    });
    ws.on("close", () => {
      console.log("클라이언트 접속 해제", ip);
      clearInterval(ws.interval);
    });
    ws.interval = setInterval(() => {
      //3초마다 클라이언트로 메세지 전송
      if (ws.readyState === ws.OPEN) {
        ws.send("서버에서 클라이언트로 메세지를 보냅니다");
      }
    }, 3000);
  });
};
