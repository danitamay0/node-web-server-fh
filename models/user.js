const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  email: {
    type: String,
    required: [true, "the email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "the password is required"],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: [true, "the rele is required"],
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  state: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject()
  user.uid = _id;
  return user
}

module.exports = model("User", UserSchema);
