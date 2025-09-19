import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function safeFileCleanup(...filePaths) {
  filePaths.forEach((filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      console.log("file cleaned: ", filePath);
    } catch (error) {
      console.error(`Failed to clean up file: ${filePath}`, error);
    }
  });
}

async function uploadFileOnCloudinary(localFilePath) {
  try {
    if (!localFilePath) return null;
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // console.log(uploadResult.url);
    // fs.unlinkSync(localFilePath);

    safeFileCleanup(localFilePath);
    return uploadResult;
  } catch (error) {
    // fs.unlinkSync(localFilePath);
    console.log("from catch error: ", error);

    safeFileCleanup(localFilePath); // remove the locally saved temp file as upload op got failed.
    return null;
  }
}

async function deleteFileFromCloudinary(publicId, resource_type) {
  try {
    if (!publicId) return null;
    return await cloudinary.uploader.destroy(publicId, {
      resource_type,
      invalidate: true,
    });
  } catch (error) {
    console.error(`Failed to delete file from Cloudinary: ${publicId}`, error);
    throw error;
  }
}

const generateUploadSig = () => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const paramsToSign = {
    timestamp,
    folder: "student_photo",
  };

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET
  );

  return {
    timestamp,
    signature,
    apiKey: process.env.CLOUDINARY_API_KEY,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    folder: "student_photo",
  };
};

export {
  uploadFileOnCloudinary,
  deleteFileFromCloudinary,
  safeFileCleanup,
  generateUploadSig,
};
