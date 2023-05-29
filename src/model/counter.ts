import mongoose, { Schema, model } from "mongoose";

const countSchema = new Schema({
  id: { type: String },
  seq: { type: Number },
});

export const CountModel = model("Counters", countSchema);
