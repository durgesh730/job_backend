const mongoose = require("mongoose")

const MONGO_URI = process.env.MONGODB_CONNECTION_STRING

module.exports = async () => {
    try {
        const conn = await mongoose.connect( MONGO_URI,)
        console.log(`Database Connected (${conn.connection.name})`)
        return conn.connection.db
    } catch (error) {
        console.log(`Error: ${error.message}`)
        console.log(`Database not Connected`)
    }
}