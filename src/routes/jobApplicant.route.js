const express = require("express")
const router = express.Router()
const { ApplicantController } = require("../controllers")
const { authMiddleware } = require("../middleware/Api-auth.middleware")
const upload = require("../middleware/multer.middleware")

router
    .route("/create_applicant")
    .post(upload.single("attachment"), ApplicantController.saveApplicants)

router
    .route("/delete_applicant/:id")
    .delete(authMiddleware("auth"), ApplicantController.deleteApplicants)

router
    .route("/all_applicants")
    .get(authMiddleware("auth"), ApplicantController.getAllApplicants)

module.exports = router