var express = require("express");
var app = express();
var { expressjwt: jwt } = require("express-jwt");
var jwks = require("jwks-rsa");

var port = process.env.PORT || 8080;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://dev-ycxqrx2b.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://samples-oauth-cc-backend.vercel.app",
  issuer: "https://dev-ycxqrx2b.us.auth0.com/",
  algorithms: ["RS256"],
});

app.use(jwtCheck);

app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

app.listen(port);
