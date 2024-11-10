const mongoose = require("mongoose")



const vacationSchema = new mongoose.Schema({
    
    id: Number,
    country: String,
    city: String,
    description: String,
    start_date: String,
    end_date: String,
    price: String,
    image_url: String
})
const VacationModel = mongoose.model("vacations", vacationSchema, "vacations")
module.exports = { VacationModel }


