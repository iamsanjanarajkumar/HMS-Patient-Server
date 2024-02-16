const mongoose = require('mongoose')

const PatientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    problemDesc:{
        type:String,
        required:true,
    },
    token:{
        type:String
    }

},{
    collection: "patients",
    timestamps: true
}
   ) 

module.exports = mongoose.model("PatientDetails", PatientSchema)