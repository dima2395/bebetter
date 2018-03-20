const Koa = require("koa");
const logger = require("koa-morgan");
const serve = require("koa-static");
// const combineRouters = require("koa-combine-routers");
const app = new Koa();

const PORT = process.env.PORT || 4000;

const notes_router = require("./api/notes").default;
const routines_router = require("./api/routines").default;
const main_router = require("./api/main").default;

// doesnt work
// const api_router = combineRouters(notes_router, routines_router);

// app.use(api_router);

app
  .use(logger("tiny"))
  .use(serve("public"))
  .use(notes_router.routes())
  .use(routines_router.routes())
  .use(main_router.routes());

app.listen(PORT);
