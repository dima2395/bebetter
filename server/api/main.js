const Router = require("koa-router");
const mainRouter = new Router({});
const fs = require("fs");
const path = require("path");

mainRouter.get("*", ctx => {
  console.log("ea tut");
  ctx.body = fs.readFileSync(
    path.resolve(path.join("public", "index.html")),
    "utf8"
  );
});

exports.default = mainRouter;
