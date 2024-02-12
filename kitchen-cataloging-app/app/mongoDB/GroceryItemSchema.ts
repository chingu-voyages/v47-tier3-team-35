import mongoose from "mongoose";
const GroceryItemSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      maxlength: 30,
    },
    description: {
      type: String,
      maxlength: 400,
    },
    labels: {
      type: [String],
      default: [],
      validate: {
        validator: function (value: String[]) {
          return value.length <= 20;
        },
        message: "Labels array cannot have more than 20 items",
      },
    },
    amount: {
      type: Number,
    },
    image: {
      type: String,
    },
    roomTitle: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    score: {
      type: Number,
    },
  },
  { collection: "GroceryItem" }
);
const GroceryItemModel =
  mongoose.models.GroceryItem ||
  mongoose.model("GroceryItem", GroceryItemSchema);
export default GroceryItemModel;
