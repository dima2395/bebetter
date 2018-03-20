const Koa = require("koa");
const logger = require("koa-morgan");
const combineRouters = require("koa-combine-routers");
const app = new Koa();

const PORT = process.env.PORT || 4000;

const notes_router = require("./api/notes").default;
const routines_router = require("./api/routines").default;

// doesnt work
const api_router = combineRouters(notes_router, routines_router);

// app.use(api_router);

app
  .use(logger("tiny"))
  .use(notes_router.routes())
  .use(routines_router.routes());

app.listen(PORT);
