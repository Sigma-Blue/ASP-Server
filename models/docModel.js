const prisma = require('../prisma/prisma');

//TODO: CREATING:

//* For creating about for post
exports.createPostAbout = async (abtDesc, postId) => {
	try {
		const about = await prisma.postAbout.create({
			data: {
				aboutDescription: abtDesc,
				belongsTo: {
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
				belongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: about, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating Post Image
exports.createPostImage = async (type, fileName, filePath, postId) => {
	try {
		const postImage = await prisma.postImage.create({
			data: {
				imageType: type,
				imageName: fileName,
				imageFilePath: filePath,
				belongsTo: {
					connect: { id: postId },
				},
			},
		});
		return { result: postImage, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating Profile Image
exports.createProfileImage = async (type, fileName, filePath, profileId) => {
	try {
		const profileImage = await prisma.profileImage.create({
			data: {
				imageType: type,
				imageName: fileName,
				imageFilePath: filePath,
				belongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: profileImage, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating document for post/profile
exports.createPostDocument = async (type, filePath, postId) => {
	try {
		const postDocument = await prisma.postDocument.create({
			data: {
				docExtention: type,
				docFilePath: filePath,
				belongsTo: {
					connect: { id: postId },
				},
			},
		});
		return { result: postDocument, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating document for post/profile
exports.createProfileDocument = async (type, filePath, profileId) => {
	try {
		const profileDocument = await prisma.profileDocument.create({
			data: {
				docExtention: type,
				docFilePath: filePath,
				belongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: profileDocument, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating Post Link
exports.createPostLink = async (type, linkName, linkUrl, postId) => {
	try {
		const postLink = await prisma.postLink.create({
			data: {
				linkType: type,
				linkName,
				linkUrl,
				belongsTo: {
					connect: { id: postId },
				},
			},
		});
		return { result: postLink, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating Profile Link
exports.createProfileLink = async (type, linkName, linkUrl, profileId) => {
	try {
		const postLink = await prisma.postLink.create({
			data: {
				linkType: type,
				linkName,
				linkUrl,
				belongsTo: {
					connect: { id: profileId },
				},
			},
		});
		return { result: postLink, error: null };
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

//* For deleting a Post Document by Post Document Id
exports.deletePostDocumentById = async (id) => {
	try {
		const postDocument = await prisma.postDocument.delete({
			where: {
				id: id,
			},
		});
		return { result: null, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Profile Document by Profile Document Id
exports.deleteProfileDocumentById = async (id) => {
	try {
		const profileDocument = await prisma.profileDocument.delete({
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
exports.deletePostLinkById = async (id) => {
	try {
		const postLink = await prisma.postLink.delete({
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
exports.deleteProfileLinkById = async (id) => {
	try {
		const profileLink = await prisma.profileLink.delete({
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
exports.selectLinksByProfileId = async (profileId) => {
	try {
		const profileLink = await prisma.profileLink.findMany({
			where: {
				profileId: profileId,
			},
			select: {
				link: true,
				linkType: true,
				linkName: true,
				linkUrl: true,
			},
		});
		return { result: profileLink, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Link by Post Id
exports.selectLinksByPostId = async (postId) => {
	try {
		const postLink = await prisma.postLink.findMany({
			where: {
				postId: postId,
			},
			select: {
				id: true,
				linkType: true,
				linkName: true,
				linkUrl: true,
			},
		});
		return { result: postLink, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Document by Profile Id
exports.selectDocumentsByProfileId = async (profileId) => {
	try {
		const profileDocument = await prisma.profileDocument.findMany({
			where: {
				profileId: profileId,
			},
			select: {
				docExtention: true,
				docFilePath: true,
			},
		});
		return { result: profileDocument, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Document by Post Id
exports.selectDocumentsByPostId = async (postId) => {
	try {
		const postDocument = await prisma.postDocument.findMany({
			where: {
				postId: postId,
			},
			select: {
				docExtention: true,
				docFilePath: true,
			},
		});
		return { result: postDocument, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Images by Profile Id
exports.selectImageByProfileId = async (id) => {
	try {
		const image = await prisma.image.findMany({
			where: {
				profileId: id,
			},
			select: {
				imageFilePath: true,
				imageType: true,
				imageName: true,
			},
		});
		return { result: image, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For Selecting the set of Image by Post Id
exports.selectImageByPostId = async (postId) => {
	try {
		const image = await prisma.image.findMany({
			where: {
				postId: postId,
			},
			select: {
				imageFilePath: true,
				imageType: true,
				imageName: true,
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
