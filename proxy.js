var httpProxy = require("http-proxy");
var os = require("os");

var interfaces = os.networkInterfaces();

for (var devName in interfaces) {
  var iface = interfaces[devName];

  for (var i = 0; i < iface.length; i++) {
    var alias = iface[i];

    if (
      alias.family === "IPv4" &&
      alias.address !== "127.0.0.1" &&
      !alias.internal
    ) {
      var proxy = httpProxy.createProxyServer({
        target: `http://${alias.address}:8080`,
        ws: true,
      });

      proxy.listen(8081, alias.address);
      console.log(
        `Proxy server is running at: http://${alias.address}:${8081}`
      );
    }
  }
}
