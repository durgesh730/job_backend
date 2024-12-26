const express = require("express")
const router = express.Router()
const validate = require("../middleware/validate")
const { ApplicantController } = require("../controllers")
const { AuthValidation } = require("../validations")
const { auth } = require("../middleware/Api-auth.middleware")

router
    .route("/create_applicant")
    .post(ApplicantController.saveApplicants)

router
    .route("/delete_applicant/:id")
    .delete(auth, ApplicantController.deleteApplicants)

router
    .route("/all_applicants")
    .get(auth, ApplicantController.getAllApplicants)

module.exports = router