import mongoose from "mongoose";

export const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected Successfully " + conn.connection.host);
    } catch (error) {
        console.error("MongoDB Connection Error:", error.message);
        process.exit(1); // Exit process with failure
    }
};

// alimaaloulabde16


// T65UfbcBlysQCuhu
