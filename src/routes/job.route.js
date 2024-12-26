const express = require("express")
const router = express.Router()
const { JobController } = require("../controllers")

router
    .route("/create_job")
    .post(JobController.createJob)

router
    .route("/delete_job/:id")
    .delete(JobController.deleteJob)

router
    .route("/all_jobs")
    .get(JobController.getAllJob)

module.exports = router