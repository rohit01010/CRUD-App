const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const UserModel = mongoose.model("User");

router.get("/list", (req, res) => {
  UserModel.find((err, docs) => {
    if (!err) {
      res.render("list", { list: docs });
    } else {
      res.send("<h1>Oops!! Some Error Occurred</h1>");
    }
  }).lean();
});

router
  .get("/insert", (req, res) => {
    res.render("insert", {
      viewTitle: "Insert User",
    });
  })
  .post("/insert", (req, res) => {
    var user = new UserModel();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.rollnumber = req.body.rollnumber;
    user.phone = req.body.phone;
    user.pinNumber = req.body.pinNumber;
    user.save((err, doc) => {
      if (!err) {
        res.redirect("/user/list");
      } else {
        res.send("<h1>Oops!! Some Error Occurred</h1> <a href='/user/insert'>Try again</a>");
      }
    });
  });

router
  .get("/update/:updateID", (req, res) => {
    UserModel.findById(req.params.updateID, (err, docs) => {
      if (!err) {
        res.render("update", {
          viewTitle: "Update User",
          user: docs,
        });
      } else {
        res.send(`<h1>Oops!! Some Error Occurred</h1> <a href='/user/update/${req.params.updateID}'>Try again</a>`);
      }
    }).lean();
  })
  .post("/update", (req, res) => {
    UserModel.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true },
      (err, doc) => {
        if (!err) {
          res.redirect("/user/list");
        } else {
          res.send("<h1>Oops!! Some Error Occurred</h1> <a href='/user/list'>Try again</a>");
        }
      }
    );
  });

router.get("/delete/:deleteID", (req, res) => {
  UserModel.findByIdAndRemove(req.params.deleteID, (err, docs) => {
    if (!err) {
      res.redirect("/user/list");
    } else {
      res.send("<h1>Oops!! Some Error Occurred</h1> <a href='/user/list'>Try again</a>");
    }
  }).lean();
});

module.exports = router;
