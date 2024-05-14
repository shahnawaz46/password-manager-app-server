import multer from 'multer';

// Temporary Storage
const storage = multer.diskStorage({});

const multerUpload = multer({ storage });

export default multerUpload;
