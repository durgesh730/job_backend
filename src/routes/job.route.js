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
    .route("/http://localhost:5000/api/v1/admin/job/create_job")
    .get(JobController.getAllJob)

module.exports = router