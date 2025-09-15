import { Schema } from "effect";
import { requestPrintify } from "../../common/requestPrintify";
import { UploadImageResponse } from "../schemas";

export type UploadImageResponseType = Schema.Schema.Type<
  typeof UploadImageResponse
>;

export interface UploadImageDataUrl {
  file_name: string;
  url: string;
}

export interface UploadImageDataBase64 {
  file_name: string;
  contents: string;
}

/**
 * Upload an image file via URL or base64-encoded contents
 *
 * @param {UploadImageDataUrl | UploadImageDataBase64} data - The data to upload (URL or base64-encoded)
 * @returns Effect that yields the uploaded image response
 *
 * @example
 * const dataUrl = { file_name: '1x1-ff00007f.png', url: 'http://png-pixel.com/1x1-ff00007f.png' };
 * const response = printify.uploads.uploadImage(dataUrl);
 *
 * const dataBase64 = { file_name: 'image.png', contents: '<base-64-encoded-content>' };
 * const response = printify.uploads.uploadImage(dataBase64);
 */
const uploadImage = (data: UploadImageDataUrl | UploadImageDataBase64) => {
  return requestPrintify(UploadImageResponse, "/v1/uploads/images.json", {
    method: "POST",
    data,
  });
};

export default uploadImage;
