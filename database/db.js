import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbname: "nodeapi"
    })
    .then(() => console.log("Connection established"))
    .catch(e => console.log(e));
};
