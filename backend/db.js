const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect("mongodb+srv://bhatraantima41:mtkbL5PbHMwNt3a5@cluster1.fp7en1z.mongodb.net/iNotebook?retryWrites=true&w=majority");

        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }

    // Event handling for connection, error, and disconnection
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
        // You might want to attempt to reconnect here
    });
};

module.exports = connectToMongo;
