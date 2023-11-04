const docModel = require('./../models/docModel');

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

//	@route	POST	/about/post
//	@desc		Create About for a Post
//	@body		id,abtDesc,postId

exports.uploadPostAbout = async (req, res) => {
	const { abtDesc, postId } = req.body;

	const { result: createAbout, error: createAboutErr } =
		await docModel.createPostAbout(abtDesc, postId);

	if (createAboutErr) {
		return res.status(500).json({
			status: 'Failure: createAboutErr',
			message: `Internal Server Error : ${createAboutErr}`,
		});
	}

	console.log(createAbout);

	return res.status(201).json({
		status: 'Success',
		message: `Successfully created the About description for Post :`,
	});
};

//	@route	POST	/about/profile
//	@desc		Create About for a Profile
//	@body		abtDesc,profileId

exports.uploadProfileAbout = async (req, res) => {
	const { abtDesc, profileId } = req.body;

	const { result: createAbout, error: createAboutErr } =
		await docModel.createProfileAbout(abtDesc, profileId);

	if (createAboutErr) {
		return res.status(500).json({
			status: 'Failure: createAboutErr',
			message: `Internal Server Error : ${createAboutErr}`,
		});
	}

	console.log(createAbout);

	return res.status(201).json({
		status: 'Success',
		message: `Successfully created the About description for Profile :`,
	});
};

//	@route	PATCH	/about/profile
//	@desc		Select About for a profile
//	@body		abtDesc,id

exports.changeProfileAbout = async (req, res) => {
	const { abtDesc, id } = req.body;
	const abtType = 'PROFILE';

	const { result: updateAbout, error: updateAboutErr } =
		await docModel.updateAboutById(id, abtType, abtDesc);

	if (updateAboutErr) {
		return res.status(500).json({
			status: 'Failure: updateAboutErr',
			message: `Internal Server Error : ${updateAboutErr}`,
		});
	}

	console.log(updateAbout);

	return res.status(201).json({
		status: 'Success',
		message: `Changed the About description Successfully`,
	});
};

//	@route	GET	/about/post/:postId
//	@desc		Select About for a Post
//	@body

exports.getPostAbout = async (req, res) => {
	const postId = req.params.postId;

	const { result: selectAbout, error: selectAboutErr } =
		await docModel.selectAboutByPostId(postId);

	if (selectAboutErr) {
		return res.status(500).json({
			status: 'Failure: selectAboutErr',
			message: `Internal Server Error : ${selectAboutErr}`,
		});
	}

	console.log(selectAbout);

	return res.status(201).json({
		status: 'Success',
		message: `About Id for the given post ${selectAbout.id}`,
		data: { about: { ...selectAbout } },
	});
};

//	@route	GET	/about/profile/:profileId
//	@desc		Select About for a profile
//	@body

exports.getProfileAbout = async (req, res) => {
	const profileId = req.params.profileId;

	const { result: selectAbout, error: selectAboutErr } =
		await docModel.selectAboutByPostId(profileId);

	if (selectAboutErr) {
		return res.status(500).json({
			status: 'Failure: selectAboutErr',
			message: `Internal Server Error : ${selectAboutErr}`,
		});
	}

	console.log(selectAbout);

	return res.status(201).json({
		status: 'Success',
		message: `About Id for the given profile ${selectAbout.id}`,
		data: { about: { ...selectAbout } },
	});
};
