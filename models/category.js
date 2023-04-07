const { Schema, model } = require("mongoose");

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, "The name is required"],
        unique:true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

CategorySchema.methods.toJSON = function () {
    const { __v, state,  ...category } = this.toObject()
    return category
  }
  

module.exports = model("Category", CategorySchema);
