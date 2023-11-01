//	@route	POST	/image/profile
//	@desc		Upload Profile Picture
//	@body		file
exports.uploadProfilePhoto = async (req, res) => {
	console.log(req.file);
	console.log(req.body);

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the profile image, imageName :`,
	});
};

//	@route	POST	/image/banner
//	@desc		Upload Banner Picture
//	@body		file
exports.uploadBannerPhoto = async (req, res) => {
	console.log(req.file);
	console.log(req.body);

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the banner image, imageName :`,
	});
};

//	@route	POST	/image/post
//	@desc		Upload Post Picture
//	@body		file
exports.uploadPostPhotos = async (req, res) => {
	console.log(req.files);
	console.log(req.body);

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the post images , imageName :`,
	});
};
