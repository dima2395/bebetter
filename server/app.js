const Koa = require("koa");
const logger = require("koa-morgan");
const combineRouters = require("koa-combine-routers");
const app = new Koa();

const PORT = process.env.PORT || 4000;

const api_router = combineRouters([
  require("./api/notes").default,
  require("./api/routines").default
]);

app.use(logger("tiny")).use(api_router);

app.listen(PORT);
