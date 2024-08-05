const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(file, folder) {
  const options = { folder, resource_type: 'auto' };
  try {
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (error) {
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
}

const imgFileHandle = async (req, res, next) => {
  console.log('Handling file upload...');
    console.log(req.files);
  if (!req.files || !req.files.images) {
    return res.status(400).json({
      success: false,
      message: 'No files were uploaded.',
    });
  }

  let files = req.files.images; // Check if files are under 'images' key
  const imgExt = ['png', 'jpg', 'jpeg', 'svg', 'mov'];

  // Ensure files is always an array
  files = Array.isArray(files) ? files : [files];

  for (const file of files) {
    const ext = file.name.split('.').pop();
    if (file.name.length > 50) {
      return res.status(400).json({
        success: false,
        filenameExceedingLength: file.name,
        message: 'File name length exceeded (should be less than or equal to 50)',
        extension: ext,
      });
    } else if (!imgExt.includes(ext)) {
      return res.status(400).json({
        success: false,
        filenameExceedingLength: file.name,
        message: 'Image file format not supported',
        extension: ext,
      });
    }
  }

  try {
    const uploadResults = [];
    for (const file of files) {
      const result = await uploadToCloudinary(file.tempFilePath, 'E-commerce');
      uploadResults.push(result.secure_url);
    }
    console.log('Uploaded files:', uploadResults);

    // Attach the URLs to the request object
    req.images = uploadResults;

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to upload files: ${error.message}`,
    });
  }
};

module.exports = { imgFileHandle };
