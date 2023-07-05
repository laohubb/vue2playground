var httpProxy = require("http-proxy");

var proxy = httpProxy.createProxyServer({
  target: "http://localhost:8080",
  ws: true,
});

proxy.listen(8081, "192.168.137.1");
console.log(`Proxy server is running at: http://${"192.168.137.1"}:${8081}`);
