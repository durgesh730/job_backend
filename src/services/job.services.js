const asyncHandler = require("../middleware/asyncHandler");
const { Job } = require("../models");
const ErrorResponse = require("../utils/ErrorResponse");

/**
 * Service to create a new job.
 * @param {Object} jobData - The job data to be created.
 * @returns {Promise<Object>} - The created job document.
 */
const createJob = asyncHandler(async (data) => {

    if (!data.jobTitle) {
        throw new ErrorResponse("Title not Found", 404);
    }

    // if (!data.skill) {
    //     throw new ErrorResponse("Skill not Found", 404);
    // }

    // Create a new job document with the validated data
    const job = new Job(data);

    // Save the job document to the database
    const savedJob = await job.save();

    return savedJob;
})

module.exports = { createJob }