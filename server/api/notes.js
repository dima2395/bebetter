const router = require("./").default;
const bodyParser = require("koa-bodyparser");
const validate = require("validate.js");
const { Note, constraints } = require("../db");

router.get("/notes", async ctx => {
  ctx.body = await Note.getNotes();
});

router.get("/notes/:id", async ctx => {
  const id = ctx.params.id;
  ctx.body = await Note.findOne({
    where: {
      id
    }
  });
});

router.post("/notes", bodyParser(), async ctx => {
  const { title, text } = ctx.request.body;
  let note, errors;
  try {
    note = Note.build({ title, text });
    errors = validate(note, constraints);
    if (errors) {
      throw Error("ValidationError");
    }
    await note.save();
    ctx.body = {
      note,
      success: {
        title: "Success!",
        message: "Note successfully created"
      }
    };
  } catch (e) {
    ctx.status = 400;
    ctx.message = "Validation Failed";
    ctx.body = {
      errors
    };
  }
});

router.put("/notes/:id", bodyParser(), async ctx => {
  const id = ctx.params.id;
  const { title, text } = ctx.request.body;
  let errors;
  const note = await Note.findOne({
    where: {
      id
    }
  });
  try {
    errors = validate(
      {
        title,
        text
      },
      constraints
    );
    if (errors) {
      throw Error("ValidationError");
    }
    const updated_note = await note.update({ title, text });
    ctx.body = {
      note: updated_note,
      success: {
        title: "Success!",
        message: "Note successfully updated"
      }
    };
  } catch (e) {
    ctx.status = 400;
    ctx.message = "Validation Failed";
    ctx.body = {
      errors
    };
  }
});

router.delete("/notes/:id", async ctx => {
  const id = ctx.params.id;
  // throw Error;
  const deleted = await Note.destroy({
    where: {
      id
    }
  });
  ctx.body = {
    id: Number(id),
    message: "Note successfully deleted"
  };
});

exports.default = router;
