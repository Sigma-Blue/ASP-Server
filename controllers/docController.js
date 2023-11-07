const docModel = require('./../models/docModel');

//	@route	POST	/image/profile
//	@desc		Upload Profile Picture
//	@body		filename, filepath, imageType, profileId
exports.uploadProfileImage = async (req, res) => {
	const { filename, filepath, imageType, profileId } = req.body;

	const { result: createProfileImage, error: createProfileImageErr } =
		await docModel.createProfileImage(imageType, filename, filepath, profileId);

	if (createProfileImageErr) {
		return res.status(500).json({
			status: 'Failure: createProfileImageErr',
			message: `Internal Server Error : ${createProfileImageErr}`,
		});
	}

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the profile image, imageName :`,
	});
};

//	@route	POST	/image/banner
//	@desc		Upload Banner Picture
//	@body		filename, filepath, imageType, profileId
exports.uploadBannerImage = async (req, res) => {
	const { filename, filepath, imageType, profileId } = req.body;

	const { result: createProfileImage, error: createProfileImageErr } =
		await docModel.createProfileImage(imageType, filename, filepath, profileId);

	if (createProfileImageErr) {
		return res.status(500).json({
			status: 'Failure: createProfileImageErr',
			message: `Internal Server Error : ${createProfileImageErr}`,
		});
	}

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the banner image, imageName :`,
	});
};

//	@route	POST	/image/post
//	@desc		Upload Post Picture
//	@body		filename, filepath, imageType, postId
exports.uploadPostImage = async (req, res) => {
	const { filename, filepath, imageType, postId } = req.body;

	const { result: createProfileImage, error: createProfileImageErr } =
		await docModel.createPostImage(imageType, filename, filepath, postId);

	if (createProfileImageErr) {
		return res.status(500).json({
			status: 'Failure: createProfileImageErr',
			message: `Internal Server Error : ${createProfileImageErr}`,
		});
	}

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the post images , imageName :`,
	});
};

//	@route	POST	/document/profile
//	@desc		Upload Profile Documentation
//	@body		type, filepath, profileId
exports.uploadProfileDocument = async (req, res) => {
	const { type, filepath, profileId } = req.body;

	const { result: createProfileDocument, error: createProfileDocumentErr } =
		await docModel.createProfileDocument(type, filepath, profileId);

	if (createProfileDocumentErr) {
		return res.status(500).json({
			status: 'Failure: createProfileDocumentErr',
			message: `Internal Server Error : ${createProfileDocumentErr}`,
		});
	}

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the profile image, imageName :`,
	});
};

//	@route	POST	/document/post
//	@desc		Upload Post Documentation
//	@body		type, filepath, profileId
exports.uploadPostDocument = async (req, res) => {
	const { type, filepath, postId } = req.body;

	const { result: createPostDocument, error: createPostDocumentErr } =
		await docModel.createPostDocument(type, filepath, postId);

	if (createPostDocumentErr) {
		return res.status(500).json({
			status: 'Failure: createPostDocumentErr',
			message: `Internal Server Error : ${createPostDocumentErr}`,
		});
	}

	return res.status(201).json({
		status: 'Success',
		message: `Successfully uploaded the profile image, imageName :`,
	});
};

//	@route	GET	/image/profile/:profileId
//	@desc		Select Profile image
//	@body

exports.getProfileImage = async (req, res) => {
	const profileId = req.params.profileId;

	const { result: selectImage, error: selectImageErr } =
		await docModel.selectImageByProfileId(profileId);

	if (selectImageErr) {
		return res.status(500).json({
			status: 'Failure: selectImageErr',
			message: `Internal Server Error : ${selectImageErr}`,
		});
	}

	console.log(selectImage);

	return res.status(201).json({
		status: 'Success',
		message: `Document Id for the given post ${selectImage.id}`,
		data: { image: { ...selectImage } },
	});
};

//	@route	GET	/image/post/:postId
//	@desc		Select Post image
//	@body

exports.getPostImage = async (req, res) => {
	const postId = req.params.postId;

	const { result: selectImage, error: selectImageErr } =
		await docModel.selectImageByPostId(postId);

	if (selectImageErr) {
		return res.status(500).json({
			status: 'Failure: selectImageErr',
			message: `Internal Server Error : ${selectImageErr}`,
		});
	}

	console.log(selectImage);

	return res.status(201).json({
		status: 'Success',
		message: `Document Id for the given post ${selectImage.id}`,
		data: { image: [...selectImage] },
	});
};

//	@route	GET	/document/profile/:profileId
//	@desc		Select Profile Documentation
//	@body

exports.getProfileDocumentation = async (req, res) => {
	const profileId = req.params.profileId;

	const { result: selectDocument, error: selectDocumentErr } =
		await docModel.selectDocumentsByProfileId(profileId);

	if (selectDocumentErr) {
		return res.status(500).json({
			status: 'Failure: selectDocumentErr',
			message: `Internal Server Error : ${selectDocumentErr}`,
		});
	}

	console.log(selectDocument);

	return res.status(201).json({
		status: 'Success',
		message: `Document Id for the given post ${selectDocument.id}`,
		data: { document: [...selectDocument] },
	});
};

//	@route	GET	/document/post/:postId
//	@desc		Select Post Documentation
//	@body

exports.getPostDocumentation = async (req, res) => {
	const postId = req.params.postId;

	const { result: selectDocument, error: selectDocumentErr } =
		await docModel.selectDocumentsByPostId(postId);

	if (selectDocumentErr) {
		return res.status(500).json({
			status: 'Failure: selectDocumentErr',
			message: `Internal Server Error : ${selectDocumentErr}`,
		});
	}

	console.log(selectDocument);

	return res.status(201).json({
		status: 'Success',
		message: `Document Id for the given post ${selectDocument.id}`,
		data: { document: [...selectDocument] },
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

//	@route	POST	/link/post
//	@desc		Create Link for a Post
//	@body		linkName, linkUrl, postId

exports.uploadPostLink = async (req, res) => {
	const { type, linkName, linkUrl, postId } = req.body;

	const { result: createPostLink, error: createPostLinkErr } =
		await docModel.createPostLink(type, linkName, linkUrl, postId);

	if (createPostLinkErr) {
		return res.status(500).json({
			status: 'Failure: createPostLinkErr',
			message: `Internal Server Error : ${createPostLinkErr}`,
		});
	}

	console.log(createPostLink);

	return res.status(201).json({
		status: 'Success',
		message: `Successfully created the Link for Post :`,
	});
};

//	@route	POST	/link/profile
//	@desc		Create Link for a Profile
//	@body		type, linkName, linkUrl, profileId

exports.uploadProfileLink = async (req, res) => {
	const { type, linkName, linkUrl, profileId } = req.body;

	const { result: createProfileLink, error: createProfileLinkErr } =
		await docModel.createProfileLink(type, linkName, linkUrl, profileId);

	if (createProfileLinkErr) {
		return res.status(500).json({
			status: 'Failure: createProfileLinkErr',
			message: `Internal Server Error : ${createProfileLinkErr}`,
		});
	}

	console.log(createProfileLink);

	return res.status(201).json({
		status: 'Success',
		message: `Successfully created the Link for Profile :`,
	});
};

//	@route	GET	/link/post/:postId
//	@desc		Select Link for a Post
//	@body

exports.getPostLink = async (req, res) => {
	const postId = req.params.postId;

	const { result: selectLinks, error: selectLinkErr } =
		await docModel.selectLinksByPostId(postId);

	if (selectLinkErr) {
		return res.status(500).json({
			status: 'Failure: selectLinkErr',
			message: `Internal Server Error : ${selectLinkErr}`,
		});
	}

	console.log(selectLinks);

	return res.status(200).json({
		status: 'Success',
		message: `About Id for the given post ${selectLinks}`,
		data: { links: [...selectLinks] },
	});
};

//	@route	GET	/link/profile/:profileId
//	@desc		Select Link for a Profile
//	@body

exports.getProfileLink = async (req, res) => {
	const profileId = req.params.profileId;

	const { result: selectLink, error: selectLinkErr } =
		await docModel.selectLinksByProfileId(profileId);

	if (selectLinkErr) {
		return res.status(500).json({
			status: 'Failure: selectLinkErr',
			message: `Internal Server Error : ${selectLinkErr}`,
		});
	}

	console.log(selectLink);

	return res.status(201).json({
		status: 'Success',
		message: `About Id for the given post ${selectLink.id}`,
		data: { link: { ...selectLink } },
	});
};
