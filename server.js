const express = require("express");
const app = express();
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme-react-redux"
);

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.get("/api/students", async (req, res, next) => {
  try {
    res.send(
      await Student.findAll({
        include: {
          model: Subject,
        },
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/students/:id", async (req, res, next) => {
  try {
    const target = await Student.findByPk(req.params.id);
    await target.destroy();
    res.sendStatus(204);
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/students", async (req, res, next) => {
  try {
    const name = req.body.name;
    const newStudent = await Student.create({ name: name });
    res.status(201).send(newStudent);
  } catch (ex) {
    next(ex);
  }
});

// app.get("/api/subjects", async (req, res, next) => {
//   try {
//     res.send(await Subject.findAll());
//   } catch (ex) {
//     next(ex);
//   }
// });

const Subject = sequelize.define("subjects", {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

const Student = sequelize.define("students", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  year: {
    type: Sequelize.STRING,
    //allowNull: false,
  },
});
//associations
Subject.hasMany(Student);
Student.belongsTo(Subject);

const init = async () => {
  await sequelize.sync({ force: true });
  console.log("syncd");
  //subjects
  const music = await Subject.create({ name: "music" });
  const psychology = await Subject.create({ name: "psychology" });
  const premed = await Subject.create({ name: "premed" });
  const law = await Subject.create({ name: "law" });
  const underWaterBasketWeaving = await Subject.create({
    name: "under water basket weaving",
  });
  const modelTrain = await Subject.create({ name: "model train construction" });
  //students
  const larry = await Student.create({
    name: "larry",
    year: "freshman",
    subjectId: music.id,
  });
  const greg = await Student.create({
    name: "greg",
    year: "freshman",
    subjectId: psychology.id,
  });
  const peter = await Student.create({
    name: "peter",
    year: "junior",
    subjectId: premed.id,
  });
  const ben = await Student.create({
    name: "ben",
    year: "senior",
    subjectId: psychology.id,
  });
  const suzy = await Student.create({
    name: "suzy",
    year: "freshman",
    subjectId: law.id,
  });
  const jeff = await Student.create({
    name: "jeff",
    year: "freshman",
    subjectId: law.id,
  });
  const moe = await Student.create({
    name: "moe",
    year: "sophmore",
    subjectId: psychology.id,
  });
  const laura = await Student.create({
    name: "laura",
    year: "sophmore",
    subjectId: modelTrain.id,
  });
  const jack = await Student.create({
    name: "jack",
    year: "sophmore",
    subjectId: premed.id,
  });
  const nora = await Student.create({
    name: "nora",
    year: "freshman",
    subjectId: underWaterBasketWeaving.id,
  });
  const anton = await Student.create({
    name: "anton",
    year: "junior",
    subjectId: underWaterBasketWeaving.id,
  });
  const mark = await Student.create({
    name: "mark",
    year: "junior",
    subjectId: premed.id,
  });
  const percy = await Student.create({
    name: "percy",
    year: "junior",
    subjectId: modelTrain.id,
  });
  const sara = await Student.create({
    name: "sara",
    year: "sophmore",
    subjectId: law.id,
  });
  const joe = await Student.create({
    name: "joe",
    year: "senior",
    subjectId: music.id,
  });
  const doug = await Student.create({
    name: "doug",
    year: "junior",
    subjectId: music.id,
  });
  const prudence = await Student.create({
    name: "prudence",
    year: "senior",
    subjectId: law.id,
  });

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
