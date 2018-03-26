const router = require("./").apiRouter;
const bodyParser = require("koa-bodyparser");
const { Routine, RoutinesProgress, createOrUpdate, db } = require("../db");
const { createMessage } = require("../utils");

router.get("/routines", async ctx => {
  let routines = await Routine.getRoutines();
  ctx.body = routines;
});

router.post("/routines", bodyParser(), async ctx => {
  const { routine } = ctx.request.body;
  const r = await Routine.create(routine, {
    fields: ["text", "status"]
  });

  //with progress
  const new_routine = await Routine.getRoutine(r.get("id"));

  ctx.body = {
    routine: new_routine,
    message: createMessage("success", "Привычка создана.")
  };
});

router.put("/routines/:id", bodyParser(), async ctx => {
  const id = ctx.params.id;
  const routine = ctx.request.body.routine;
  let [count, r] = await Routine.update(routine, {
    fields: ["text", "status"],
    returning: true,
    plain: true,
    where: {
      id
    }
  });

  //with progress
  const new_routine = await Routine.getRoutine(r.get("id"));

  ctx.body = {
    routine: new_routine,
    message: createMessage("success", "Привычка обновлена.")
  };
});

router.delete("/routines/:id", async ctx => {
  const id = ctx.params.id;
  await Routine.destroy({
    where: {
      id
    }
  });
  ctx.body = {
    id: Number(id),
    message: createMessage("success", "Привычка удалена.")
  };
});

//Routines progress
// router.get("/routines/:routine_id/progress", async ctx => {
//   const routine_id = ctx.params.routine_id;
//   const routine_progress = await RoutinesProgress.getProgress(routine_id);
//   const routine = await Routine.findOne({
//     where: {
//       id: routine_id
//     }
//   });
//   const routine_createdAt = routine.createdAt;
//   ctx.body = {
//     routine_createdAt,
//     routine_progress
//   };
// });

router.post("/routines/:routine_id/progress", bodyParser(), async ctx => {
  const routine_id = ctx.params.routine_id;
  const { daily_progress } = ctx.request.body;
  daily_progress.routine_id = routine_id;
  const new_daily_progress = await createOrUpdate(
    RoutinesProgress,
    daily_progress,
    { day: daily_progress.day, routine_id }
  );
  ctx.body = {
    daily_progress: new_daily_progress
  };
});

exports.default = router;
