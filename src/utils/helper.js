import ApiError from "./ApiError.js";

const checkRequiredFields = (obj, requiredFields) => {
  for (const key of requiredFields) {
    const value = obj[key];
    if (
      value === null ||
      value === undefined ||
      (typeof value === "string" && value?.trim() === "")
    ) {
      throw new ApiError(400, `Missing or empty field: ${key}`);
    }
  }
};

export { checkRequiredFields };
