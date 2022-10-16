const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

Schema.statics = {
  findByParam: function (search) {
    const string = search;
    const regex = new RegExp(string, "i");
    return this.find({ title: regex });
  },
};

module.exports = Schema; // +> Readymade Schema
