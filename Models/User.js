const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  rollnumber: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required:true,
  },
  pinNumber: {
    type: String,
    required:true
  }
});
mongoose.model("User", UserSchema);
