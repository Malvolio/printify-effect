import { requestPrintify } from "../../common/requestPrintify";
import { ImageId } from "../brands";
import { EmptyResponse } from "../schemas";

/**
 * Archive an uploaded image
 *
 * @param {string} imageId - The ID of the image to be archived
 * @returns Effect that yields an empty response
 *
 * @example
 * const imageId = "5cb87a8cd490a2ccb256cec4" as ImageId;
 * const result = printify.uploads.archive(imageId);
 * // Expected response: {}
 */
const archive = (imageId: ImageId) => {
  return requestPrintify(EmptyResponse, `/v1/uploads/${imageId}/archive.json`, {
    method: "POST",
  });
};

export default archive;
