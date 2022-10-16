const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
// => Importing Schema
const todoSchema = require("../models/mongo.schema");
const Todo = new mongoose.model("Todo", todoSchema);

router.get("/", async (req, res) => {
  try {
    await Todo.find({ status: "active" })
      .select({
        date: 0,
        __v: 0,
      })
      .exec((err, result) => {
        if (err) {
          res.status(500).json({
            error: err.message,
          });
        } else {
          res.status(200).json({
            message: "Success",
            myTodoList: result,
          });
        }
      });
  } catch (err) {
    console.log(err.message);
  }
});

// => POST SINGLE TODO
router.post("/", async (req, res) => {
  try {
    const saveTodo = new Todo(req.body);
    await saveTodo.save();
    res.status(200).json({
      message: "Success",
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

// => POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (err) {
      res.status(500).json({
        error: err.message,
      });
    } else {
      res.status(200).json({
        message: "Success",
      });
    }
  });
});

// => SEARCH TODO
router.get("/:search", async (req, res) => {
  const search = req.params.search;
  const sendData = await Todo.findByParam(search);
  res.status(200).json({
    Search: sendData,
  });
});

// => UPDATE TODO
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: {
          title: "MARAKHAW",
        },
      },
      (err) => {
        if (err) {
          res.status(500).json({
            message: err.message,
          });
        } else {
          res.status(200).json({
            message: "Successfully",
          });
        }
      }
    );
  } catch (err) {
    console.log(err.message);
  }
});

// => DELETE TODO
router.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id }, (err) => {
      if (err) {
        res.status(500).json({
          message: err.message,
        });
      } else {
        res.status(200).json({
          message: "Successfully Deleted",
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
});
module.exports = router;
