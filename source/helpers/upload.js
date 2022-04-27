const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const { nanoid } = require('nanoid');

const {
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;

let storage;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
  secure: true
});

storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder : 'vehicool/uploads',
    format: async (req, file) => 'jpg',
    public_id: async (req, file) => {
      const currentDate = Date.now();
      const fileName = String(nanoid(10)) + '-' + currentDate;
      return fileName;
    }
  }
});

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     const _file = file.originalname.split('.');
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, _file[0] + '-' + uniqueSuffix + '.' + _file[1]);
//   }
// });


const fileFilter = (req, file, cb) => {
  const supportedMime = [
    'image/jpeg',
    'image/png',
    'image/gif'
  ];
  if (!supportedMime.includes(file.mimetype)) {
    cb(new Error('Filetype mismatch!'), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 2097152 // 2MB
  }
});

module.exports = upload;