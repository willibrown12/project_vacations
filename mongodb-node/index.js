const mongoose = require("mongoose")
const { VacationModel } = require("./models/VacationModel")
const url = "mongodb://localhost:27017/locations"

async function connectToDB() {
    return await mongoose.connect(url)
}

async function init() {
    try {
        await connectToDB()
        console.log("MongoDB connected")
        runQueries()
    } catch (error) {
        console.log("Something went wrong with the connection")
    }
}


async function runQueries() {
    const result = await VacationModel.find({country: "USA",})
    console.log(result)
}

init()


