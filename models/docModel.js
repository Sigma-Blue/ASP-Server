const prisma = require('../prisma/prisma');

//TODO: CREATING:

//* For creating about for post/profile

const createAbout = async (abtDesc, isPost, postId, profileId) => {
	try {
		const about = await prisma.about.create({
			data: {
				aboutDescription: abtDesc,
				isPost,
				postBelongsTo: {
					connect: { id: postId },
				},
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

const createImage = async (
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
				isPost,
				isBanner,
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

const createDocument = async (
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

const createLink = async (isPost, linkName, linkUrl, postId, profileId) => {
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

const updateCourseById = async (id, abtDesc) => {
	try {
		const about = await prisma.course.update({
			where: {
				id: id,
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

const deleteImageById = async (id) => {
	try {
		const image = await prisma.image.delete({
			where: {
				id: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Document by Document Id

const deleteDocumentById = async (id) => {
	try {
		const image = await prisma.document.delete({
			where: {
				id: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For deleting a Link by Link Id

const deleteLinkById = async (id) => {
	try {
		const image = await prisma.link.delete({
			where: {
				id: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//TODO: READING:

//* For Selecting the set of Link by Profile Id

const selectLinksByProfileId = async (id) => {
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

const selectLinksByPostId = async (id) => {
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

const selectDocumentsByProfileId = async (id) => {
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

const selectDocumentsByPostId = async (id) => {
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

const selectImagesByProfileId = async (id) => {
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

const selectImageByPostId = async (id) => {
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

const selectAboutByProfileId = async (id) => {
	try {
		const about = await prisma.about.findUnique({
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

const selectAboutByPostId = async (id) => {
	try {
		const about = await prisma.about.findUnique({
			where: {
				postId: id,
			},
		});
		return { result: about, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};
