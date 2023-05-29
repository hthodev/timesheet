import mongoose from "mongoose";
require("dotenv").config();

const uri = process.env.uri;

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

export const DBConnection = () => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log("The MongoDb is connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
