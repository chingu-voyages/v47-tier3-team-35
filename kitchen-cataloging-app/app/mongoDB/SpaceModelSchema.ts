import mongoose from "mongoose";
const SpaceSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    title: {
      type: String,
      maxlength: 30,
    },
    itemCount: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    score: {
      type: Number,
    },
  },
  { collection: "Room" }
);
const SpaceModel =
  mongoose.models.Space ||
  mongoose.model("Space", SpaceSchema);
export default SpaceModel;
