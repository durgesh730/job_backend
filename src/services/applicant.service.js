const { jobApplicant } = require("../models");

/**
 * Creates a new user account.
 * @param {Object} body - The request body containing user details.
 * @returns {Promise<Auth>} - The created Auth user object.
 * @throws {ErrorResponse} - If the email or telephone is already taken.
 */

const saveApplicants = async (body) => {
    const data = { ...body }

    if (!data.email) {
        throw new ErrorResponse("Email not Found", 404);
    }

    if (!data.telephone) {
        throw new ErrorResponse("Phone Number not Found", 404);
    }

    if (!data.jobId) {
        throw new ErrorResponse("jobId not Found", 404);
    }

    if (!data.attachment) {
        throw new ErrorResponse("Attachment not Found", 404);
    }

    const user = await jobApplicant.create(data);
    return user
}


module.exports = {
    saveApplicants
}