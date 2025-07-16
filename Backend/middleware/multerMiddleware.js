// import multer from 'multer';
// import path from 'path';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/services/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   }
// });

// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     const ext = path.extname(file.originalname);
//     if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext.toLowerCase())) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only image files are allowed!'), false);
//     }
//   }
// });

// export default upload;


import multer from 'multer';
import path from 'path';

// Define where to store uploaded files and how to name them
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Store files in the 'uploads' folder
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Generate a unique file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the multer instance with the storage configuration
const upload = multer({ storage: storage });

export default upload;
