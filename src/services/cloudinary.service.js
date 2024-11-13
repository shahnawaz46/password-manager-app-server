import cloudinary from '../config/cloudinary.config.js';

export const uploadImage = async (url) => {
  const options = {
    upload_preset: 'password-manager',
    allowed_formats: ['png', 'jpg', 'jpeg', 'webp', 'ico', 'avif'],
  };

  // transform image
  // const transformedImage = cloudinary.url(url, {
  //   transformation: [
  //     { width: 1000, crop: 'scale' },
  //     { quality: 'auto' },
  //     { fetch_format: 'auto' },
  //   ],
  // });

  try {
    const result = await cloudinary.uploader.upload(url, options);
    return { url: result.secure_url, publicId: result.public_id };
  } catch (err) {
    console.log(err);
  }
};

export const deleteImage = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.log(err);
  }
};
