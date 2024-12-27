const express = require("express")
const router = express.Router()
const { JobController } = require("../controllers")
const { JobValidation } = require("../validations")
const validate = require("../middleware/validate")

router
    .route("/create_job")
    .post(validate(JobValidation.createNewJob), JobController.createJob)

router
    .route("/delete_job/:id")
    .delete(JobController.deleteJob)

router
    .route("/all_jobs")
    .get(JobController.getAllJob)

module.exports = router