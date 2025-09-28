import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  time: String,
  description: String,
  location: String,
});

const itinerarySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    destination: { type: String, required: true, index: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    activities: [activitySchema],
  },
  { timestamps: true }
);

const Itinerary = mongoose.model("Itinerary", itinerarySchema);

export default Itinerary;
