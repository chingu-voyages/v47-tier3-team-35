import mongoose from "mongoose";
const FoodSchema = new mongoose.Schema(
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
    price: {
      type: Number,
      validate: {
        validator: function (value: number) {
          return value % 0.01 === 0;
        },
        message: "Price must have 2 decimal places",
      },
    },
    amount: {
      type: Number,
    },
    threshold: {
      type: Number,
    },
    expirationDate: {
      type: Date,
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
  { collection: "Food" }
);
const FoodModel = mongoose.models.Food || mongoose.model("Food", FoodSchema);
export default FoodModel;
