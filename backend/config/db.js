import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connectToDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,  // 5-second connection timeout
            heartbeatFrequencyMS: 3000,      // Regular connection checks
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("\n--- MongoDB Connection Failed ---");
        
        // Handle AggregateError specifically
        if (error.name === 'AggregateError') {
            console.error('Root Cause:', error.cause || 'No cause provided');
            console.error('Detailed Errors:', error.errors || 'No errors array');
        } else {
            console.error('Standard Error:', error);
        }

        // Additional diagnostics
        console.log('\nDiagnostic Checks:');
        console.log('- URI Format:', process.env.MONGO_URI ? 'Exists' : 'Missing');
        console.log('- Connection Timeout:', error._message?.includes('timeout') ? 'Yes' : 'No');
        
        process.exit(1);
    }
};


// alimaaloulabde16


// T65UfbcBlysQCuhu
