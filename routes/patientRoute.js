const patientRoute = require('express').Router()
const { getSingle , createPatient, allPatients } = require('../controller/patientController.js')

patientRoute.get(`/single/:id`, getSingle)

patientRoute.get(`/all`, allPatients)

patientRoute.post(`/create`, createPatient)

module.exports = patientRoute