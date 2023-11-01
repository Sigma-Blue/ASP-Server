const multer = require('multer');

// MULTER STORAGE :
const multerStorage = multer.memoryStorage();

// Image Filter
const multerImageFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image')) {
		cb(null, true);
	} else {
		cb(('Not an image! Please upload only images.', 400), false);
	}
};

// Pdf Filter
const multerPdfFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('application')) {
		cb(null, true);
	} else {
		cb(('Not an application! please upload only applications.', 400), false);
	}
};

// Upload Image
exports.uploadImage = multer({
	storage: multerStorage,
	fileFilter: multerImageFilter,
});

// Upload F
exports.uploadApplication = multer({
	storage: multerStorage,
	fileFilter: multerPdfFilter,
});
