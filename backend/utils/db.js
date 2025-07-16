import mongoose from "mongoose";

export const db = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Succesfully connected to DB");
    })
    .catch((err) => {
      console.log(`Error connecting to DB :  ${err}`);
    });
};
