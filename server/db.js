const Sequelize = require("sequelize");
const validate = require("validate.js");

const dbString =
  process.env.DATABASE_URL ||
  "postgres://postgres:12345@localhost:5432/bebetter";

const db = new Sequelize(dbString, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false,
  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});

function createOrUpdate(model, values, where) {
  return model.findOne({ where }).then(function(obj) {
    if (obj) {
      // update
      return obj.update(values);
    } else {
      // insert
      return model.create(values);
    }
  });
}

const Note = db.define("note", {
  title: Sequelize.STRING,
  text: Sequelize.TEXT
});

Note.getNotes = async function() {
  return await Note.findAll({
    order: [["createdAt", "DESC"]]
  });
};

const constraints = {
  title: {
    presence: {
      allowEmpty: false
    },
    length: {
      maximum: 60
    }
  },
  text: {
    presence: {
      allowEmpty: false
    }
  }
};

//routines
const Routine = db.define("routine", {
  text: Sequelize.TEXT,
  status: {
    type: Sequelize.ENUM,
    values: ["completed", "processing"]
  }
});

Routine.getRoutine = async function(id) {
  const routine = await Routine.findOne({
    where: {
      id
    }
  });

  const progress = await RoutinesProgress.getProgress(routine.get("id"));
  let routine_data = routine.get();
  routine_data.progress = progress;

  return routine_data;
};

Routine.getRoutines = async function() {
  //ea ne znaiu kak eto sdelati toliko na SQL :(
  //eto vremenno :)
  const routines = await Routine.findAll({
    order: [["createdAt", "DESC"]]
  });
  let routines_data = routines.map(routine => routine.get());
  //add progress
  const results = await db.query(
    `select routine_progress.routine_id as id, array_to_json(array_agg(routine_progress)) as progress 
    from routine_progress
    group by routine_id`,
    {
      type: db.QueryTypes.SELECT
    }
  );

  results.map((result, i) => {
    const index = routines.findIndex(routine => routine.id === result.id);
    routines_data[index].progress = result.progress;

    //if no progress add empty arr
    routines_data.map((routine, i) => {
      if (!routine.hasOwnProperty("progress")) {
        routine.progress = [];
      }
    });
  });

  return routines_data;
};

const RoutinesProgress = db.define(
  "routine_progress",
  {
    routine_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Routine,
        key: "id"
      },
      onDelete: "CASCADE"
    },
    day: Sequelize.DATEONLY,
    done: Sequelize.BOOLEAN
  },
  {
    freezeTableName: true
  }
);

RoutinesProgress.getProgress = async function(routine_id) {
  return await RoutinesProgress.findAll({
    where: {
      routine_id
    },
    order: [["day", "DESC"]]
  });
};

db.sync();

module.exports = {
  db,
  Note,
  Routine,
  RoutinesProgress,
  createOrUpdate,
  constraints
};
