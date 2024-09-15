import mongoose, { Schema, models } from "mongoose";

const sessionSchema = new Schema(
  {
    client: {
      type: new Schema({
        _id: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
      }),
      required: true,
    },
    sessionDate: {
      type: Date,
      required: true,
    },
    sessionDuration: {
      type: String,
      required: false,
    },
    sessionType: {
      type: String,
      enum: ["recording", "transcription"],
      required: true,
    },
    notes: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Session = models.Session || mongoose.model("Session", sessionSchema);
export default Session;
