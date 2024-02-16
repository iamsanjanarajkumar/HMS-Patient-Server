const {StatusCodes} = require('http-status-codes');
const Patients =  require('../model/patientModel.js')

const getSingle = async( req, res) =>{
    try {
       let id = req.params.id
       
       let singlePatient = await Patients.findById({ _id: id})


       res.status(StatusCodes.ACCEPTED).json({ data: singlePatient})
    } catch (error) {
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message}) 
    }
}
const allPatients = async( req, res) =>{
    try {
         let allPatientsInfo =  await Patients.find({})
        let  patients = allPatientsInfo.filter((item) => item.token !== "")


        res.status(StatusCodes.OK).json({ length:  patients.length, patients, success: true })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message})  
    }
}
const createPatient = async(req, res) => {
    try {
        let { name, mobile, email, gender, problemDesc} = req.body;
        var mainPatients = await Patients.find({})
        var tokenGen = mainPatients.length + 1;
        let newPatient = await Patients.create({
            name,
            email,
            mobile,
            gender,
            problemDesc,
            token:tokenGen
        })

        res.status(StatusCodes.OK).json({msg : `New Patient Created Successfully`, data: newPatient, len:mainPatients.length})
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error.message})  
    }
}


module.exports = { getSingle , createPatient, allPatients}