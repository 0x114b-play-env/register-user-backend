import asyncHandler from "../utils/AsyncHandler.js";
import { checkRequiredFields } from "../utils/helper.js";
import Student from "../models/student.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateUploadSig } from "../utils/cloudinary.js";

const getUploadSig = (req, res) => {
  const uploadSignature = generateUploadSig();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        uploadSignature,
        "Upload signature generated successfully"
      )
    );
};

const saveResponse = (req, res) => {
  const { public_id, url, secure_url } = req.body;

  console.log({ public_id, url, secure_url });

  return res.json({ ok: true });
};

const createStudent = asyncHandler(async (req, res) => {
  const { name, age, email, phone, address, public_id, url, secure_url } =
    req.body;

  checkRequiredFields(req.body, [
    "name",
    "age",
    "email",
    "phone",
    "address",
    "public_id",
    "url",
    "secure_url",
  ]);

  const createdStudent = await Student.create({
    name,
    age,
    email,
    phone,
    address,
    photo: {
      public_id,
      url,
      secure_url,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdStudent, "Student registered sucessfully")
    );
});

export { createStudent, getUploadSig, saveResponse };
