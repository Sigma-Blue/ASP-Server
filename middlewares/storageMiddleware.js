const sharp = require('sharp');
const multerStorage = require('../services/multerStorage');

//	@route
//	@desc		Filter and Upload a Single Profile Photo to the multerStorage
//	@body		file
exports.uploadProfilePhoto = multerStorage.uploadImage.single('photo');

//	@route
//	@desc		Filter and Upload a Single Banner Photo to the multerStorage
//	@body		file
exports.uploadBannerPhoto = multerStorage.uploadImage.single('photo');

//	@route
//	@desc		Filter and Upload a Multiple Post Photo to the multerStorage
//	@body		file
exports.uploadPostPhotos = multerStorage.uploadImage.fields([
	{ name: 'coverPhoto', maxCount: 1 },
	{ name: 'photos', maxCount: 5 },
]);

//	@route
//	@desc		Rename and Resize the Profile Photo
//	@body		file
exports.resizeProfilePhoto = async (req, res, next) => {
	// if file does not exist no need to resize
	if (!req.file) return next();
	// Set new conventional Name to the File
	req.file.filename = `profile--${Date.now()}.jpeg`;
	req.file.filepath = `public/images/profileImages/${req.file.filename}`;
	req.file.imageType = 'PROFILE';

	// Resize the file
	await sharp(req.file.buffer)
		.resize(500, 500)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/images/profileImages/${req.file.filename}`);

	next();
};

//	@route
//	@desc		Rename and Resize the Banner Photo
//	@body		file
exports.resizeBannerPhoto = async (req, res, next) => {
	// if file does not exist no need to resize
	if (!req.file) return next();

	// Set new conventional Name to the File
	req.file.filename = `banner--${Date.now()}.jpeg`;
	req.file.filepath = `public/images/bannerImages/${req.file.filename}`;
	req.file.imageType = 'BANNER';

	// Resize the file
	await sharp(req.file.buffer)
		.resize(2000, 1333)
		.toFormat('jpeg')
		.jpeg({ quality: 95 })
		.toFile(`public/images/bannerImages/${req.file.filename}`);

	next();
};

//	@route
//	@desc		Rename and Resize the Banner Photo
//	@body		file
exports.resizePostPhotos = async (req, res, next) => {
	// if file does not exist no need to resize
	console.log('req.files', req.files);
	if (!req.files.coverPhoto || !req.files.photos) return next();

	// Set new conventional Name to the File
	req.files.coverPhoto.filename = `coverPhoto--${Date.now()}.jpeg`;
	req.files.coverPhoto.filepath = `public/images/postImages/${req.files.coverPhoto.filename}`;
	req.files.coverPhoto.imageType = 'COVER_POST';

	// Resize the file
	await sharp(req.files.coverPhoto[0].buffer)
		.resize(2000, 1333)
		.toFormat('jpeg')
		.jpeg({ quality: 90 })
		.toFile(`public/images/postImages/${req.files.coverPhoto.filename}`);

	req.files.images = [];
	req.files.imagesPath = [];

	await Promise.all(
		req.files.photos.map(async (file, i) => {
			// Set new conventional Name to all the Files
			const filename = `postPhoto-${i + 1}--${Date.now()}.jpeg`;
			const filepath = `public/images/postImages/${filename}`;

			// Resize all the files
			await sharp(file.buffer)
				.resize(2000, 1333)
				.toFormat('jpeg')
				.jpeg({ quality: 90 })
				.toFile(filepath);

			req.files.images.push(filename);
			req.files.imagesPath.push(filepath);
			req.files.imageType = 'POST';
		})
	);

	next();
};
