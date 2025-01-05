const { uploadImage } = require("../helpers/cloudinaryUploader");
const { jobApplicant } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");
const DatauriParser = require('datauri/parser');
const path = require("path")
/**
 * Creates a new user account.
 * @param {Object} body - The request body containing user details.
 * @returns {Promise<Auth>} - The created Auth user object.
 * @throws {ErrorResponse} - If the email or telephone is already taken.
 */
const saveApplicants = async (body) => {
    let data;

    if (body instanceof FormData) {
        data = {};
        body.forEach((value, key) => {
            data[key] = value;
        });
    } else if (typeof body === "object" && body !== null) {
        data = body;
    } else {
        throw new ErrorResponse("Invalid data format", 400);
    }

    console.log("Converted Data ====>>>", data);

    // Perform validations
    if (!data.email) {
        throw new ErrorResponse("Email is required", 400);
    }

    if (!data.telephone) {
        throw new ErrorResponse("Phone number is required", 400);
    }

    if (!data.jobId) {
        throw new ErrorResponse("Job ID is required", 400);
    }

    if (!data.attachment) {
        throw new ErrorResponse("Attachment is required", 400);
    }

    try {

        // console.log("cloudinaryResult ====>>", data.attachment)
        // const parser = new DatauriParser();
        // const extName = path.extname(data.attachment.originalname).toString();
        // const y = parser.format(extName, data.attachment.buffer)
        // console.log("ext ===============>>> ", y)

        const cloudinaryResult = await uploadImage(data.attachment.path);
        console.log("Uploaded Attachment URL:", cloudinaryResult);
        data.attachment = {
            public_id: cloudinaryResult.public_id,
            asset_id: cloudinaryResult.asset_id,
            url: cloudinaryResult.secure_url
        }
        const user = await jobApplicant.create(data);
        return user;
    } catch (error) {
        console.log("errrrr", error)
        throw new ErrorResponse("Failed to upload attachment", 500);
    }
};


module.exports = {
    saveApplicants
}



