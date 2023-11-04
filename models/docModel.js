const prisma = require('../prisma/prisma');

//TODO: CREATING:

//* For creating about for post

exports.createPostAbout = async (abtDesc, postId) => {
	try {
		const about = await prisma.postAbout.create({
			data: {
				aboutDescription: abtDesc,
				postBelongsTo: {
					connect: { id: postId },
				},
			},
		});
		return { result: about, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating about for profile

exports.createProfileAbout = async (abtDesc, profileId) => {
	try {
		const about = await prisma.profileAbout.create({
			data: {
				aboutDescription: abtDesc,
				profileBelongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: about, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating Image for post/profile

exports.createImage = async (
	isPost,
	isBanner,
	imgExt,
	imgType,
	imgVal,
	postId,
	profileId
) => {
	try {
		const image = await prisma.image.create({
			data: {
				isPost: isPost,
				isBanner: isBanner,
				imageExtension: imgExt,
				imageType: imgType,
				imageValue: imgVal,
				postBelongsTo: {
					connect: { id: postId },
				},
				profileBelongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: image, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating document for post/profile

exports.createDocument = async (
	isPost,
	docExt,
	docType,
	docVal,
	postId,
	profileId
) => {
	try {
		const document = await prisma.document.create({
			data: {
				isPost,
				docExtension: docExt,
				docType: docType,
				docValue: docVal,
				postBelongsTo: {
					connect: { id: postId },
				},
				profileBelongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: document, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating link for the post/profile

exports.createLink = async (isPost, linkName, linkUrl, postId, profileId) => {
	try {
		const link = await prisma.link.create({
			data: {
				isPost,
				linkName,
				linkUrl,
				postBelongsTo: {
					connect: { id: postId },
				},
				profileBelongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: link, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: UPDATING:

//* For updating About by About Id

exports.updateProfileAboutById = async (id, abtType, abtDesc) => {
	try {
		const about = await prisma.profileAbout.update({
			where: {
				id: id,
				aboutType: abtType,
			},
			data: {
				aboutDescription: abtDesc,
			},
		});
		return { result: about, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: DELETING:

//* For deleting an Image by Image Id

exports.deleteImageById = async (id) => {
	try {
		const image = await prisma.image.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Document by Document Id

exports.deleteDocumentById = async (id) => {
	try {
		const image = await prisma.document.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Link by Link Id

exports.deleteLinkById = async (id) => {
	try {
		const image = await prisma.link.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting an About by About Id

exports.deletePostAboutById = async (id) => {
	try {
		const about = await prisma.postAbout.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: READING:

//* For Selecting the set of Link by Profile Id

exports.selectLinksByProfileId = async (id) => {
	try {
		const link = await prisma.link.findMany({
			where: {
				profileId: id,
			},
		});
		return { result: link, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Link by Profile Id

exports.selectLinksByPostId = async (id) => {
	try {
		const link = await prisma.link.findMany({
			where: {
				postId: id,
			},
		});
		return { result: link, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Document by Profile Id

exports.selectDocumentsByProfileId = async (id) => {
	try {
		const document = await prisma.document.findMany({
			where: {
				profileId: id,
			},
		});
		return { result: document, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Document by Post Id

exports.selectDocumentsByPostId = async (id) => {
	try {
		const document = await prisma.document.findMany({
			where: {
				postId: id,
			},
		});
		return { result: document, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Images by Profile Id

exports.selectImagesByProfileId = async (id) => {
	try {
		const image = await prisma.image.findMany({
			where: {
				profileId: id,
			},
		});
		return { result: image, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Image by Post Id

exports.selectImageByPostId = async (id) => {
	try {
		const image = await prisma.image.findMany({
			where: {
				postId: id,
			},
		});
		return { result: image, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the About by Profile Id

exports.selectAboutByProfileId = async (id) => {
	try {
		const about = await prisma.profileAbout.findUnique({
			where: {
				profileId: id,
			},
		});
		return { result: about, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the About by Post Id

exports.selectAboutByPostId = async (postId) => {
	try {
		const about = await prisma.postAbout.findUnique({
			where: {
				postId: postId,
			},
			select: {
				id: true,
				aboutDescription: true,
			},
		});
		return { result: about, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
