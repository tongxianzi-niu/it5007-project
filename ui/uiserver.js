require("dotenv").config();
const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();

app.use(express.static("public"));

// const apiProxyTarget = process.env.API_PROXY_TARGET;
// if (apiProxyTarget) {
//   app.use("/graphql", proxy({ target: apiProxyTarget }));
// }

app.listen(8000, () => {
  console.log(`UI started on port ${port}`);
});
