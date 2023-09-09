require("dotenv").config();
const moongose = require("mongoose");
const Task = require("../../api/tasks/tasks.model.js");
const DB_URL = process.env.DB_URL;
const tasks = [
  {
    name: "puerta",
  },
  {
    name: "bascula_1",
  },
  {
    name: "bascula_2",
  },
  {
    name: "cuadro_1",
  },
  {
    name: "cuadro_2",
  },
  {
    name: "ar_1",
  },
  {
    name: "ar_2",
  },
  {
    name: "ar_3",
  },
  {
    name: "ar_4",
  },
  {
    name: "ar_5",
  },
  {
    name: "ar_6",
  },
  {
    name: "ar_7",
  },
  {
    name: "ar_8",
  },
  {
    name: "puerta",
  },
  {
    name: "reconocimiento_1",
  },
  {
    name: "reconocimiento_2",
  },
  {
    name: "luz_1",
  },
  {
    name: "luz_2",
  },
  {
    name:"reina",
  },
  {
    name:"sala_creada",
  },
  {
    name:"jugador_1"
  },
  {
    name:"jugador_2"
  },
  {
    name:"puzzle"
  },
];

moongose
  .connect(DB_URL)
  .then(async () => {
    const tasks = await Task.find();
    if (tasks.length) {
      await Task.collection.drop();
    }
  })
  .catch((error) => console.log("Error deleting tasks collection from seed: " + error))
  .then(async () => {
    await Task.insertMany(tasks);
  })
  .catch((error) => console.log("Error creation tasks from seed: " + error))
  .finally(() => moongose.disconnect());
