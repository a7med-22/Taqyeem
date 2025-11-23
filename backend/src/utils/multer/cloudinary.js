import { v2 as cloudinary } from "cloudinary";

export const cloud = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  return cloudinary;
};

export const uploadFile = async ({ file, filePath = "general" }) => {
  return await cloud().uploader.upload(file.path, {
    folder: `${process.env.CLOUDINARY_FOLDER || "taqyeem"}/${filePath}`,
  });
};

export const uploadFiles = async ({ files, filePath = "general" }) => {
  let attachments = [];
  for (const file of files) {
    const { secure_url, public_id } = await uploadFile({
      file,
      filePath,
    });
    attachments.push({ secure_url, public_id });
  }
  return attachments;
};

export const destroyFile = async ({ publicId = "" } = {}) => {
  return await cloud().uploader.destroy(publicId);
};

export const destroyFiles = async ({ publicIds = [], options } = {}) => {
  return await cloud().api.delete_resources(publicIds, options);
};

export const deleteFolderByPrefix = async ({ prefix = "" } = {}) => {
  return await cloud().api.delete_resources_by_prefix(
    `${process.env.CLOUDINARY_FOLDER || "taqyeem"}/${prefix}`
  );
};
