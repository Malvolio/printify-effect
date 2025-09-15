import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { ImageId } from "../brands";
import { GetUploadByIdResponse } from "../schemas";

export type GetUploadByIdResponseType = Schema.Schema.Type<
  typeof GetUploadByIdResponse
>;

/**
 * Retrieve an uploaded image by id
 *
 * @param {string} imageId - The ID of the image to retrieve
 * @returns Effect that yields the upload image data
 *
 * @example
 * const imageId = "5e16d66791287a0006e522b2" as ImageId;
 * const imageData = printify.uploads.getById(imageId);
 * // Expected response:
 * // {
 * //   id: "5e16d66791287a0006e522b2",
 * //   file_name: "png-images-logo-1.jpg",
 * //   height: 5979,
 * //   width: 17045,
 * //   size: 1138575,
 * //   mime_type: "image/png",
 * //   preview_url: "https://example.com/image-storage/uuid1",
 * //   upload_time: "2020-01-09 07:29:43"
 * // }
 */
const getById = (imageId: ImageId) => {
  return requestPrintify(GetUploadByIdResponse, `/v1/uploads/${imageId}.json`, {
    method: "GET",
  });
};

export default getById;
