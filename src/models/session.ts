import mongoose, { Schema, models } from "mongoose";

const sessionSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    sessionDuration: {
      type: String,
      required: true,
    },
    sessionType: {
      type: String,
      enum: ["recording", "transcription"],
      required: true,
    },
  },
  { timestamps: true }
);

const Session = models.Session || mongoose.model("Session", sessionSchema);
export default Session;
