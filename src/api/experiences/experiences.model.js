const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema(
  {
    date: { type: Date, required: true },
    // details:{type:EscapeRoom}
    email: { type: String },
    started_at: { type: Date },
    finished_at: { type: Date },
  },
  {
    timestamp: true,
  }
);
