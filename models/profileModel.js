const prisma = require('../prisma/prisma');

//* For creating Profile of an user

const createProfile = async (
	fName,
	mName,
	lName,
	userType,
	dptName,
	regNo,
	dob,
	gender,
	age,
	userId
) => {
	try {
		const profile = await prisma.profile.create({
			data: {
				firstName: fName,
				middleName: mName,
				lastName: lName,
				userType: userType,
				departmentName: dptName,
				registerNo: regNo,
				birthDate: dob,
				gender: gender,
				age: age,
				createdBy: {
					connect: {
						id: userId,
					},
				},
			},
		});
		return { result: profile, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For updating Profile info by Profile ID

const updateProfileById = async (
	id,
	fName,
	mName,
	lName,
	userType,
	dptName,
	regNo,
	dob,
	gender,
	age
) => {
	try {
		const profile = await prisma.profile.update({
			where: {
				id: id,
			},
			data: {
				firstName: fName,
				middleName: mName,
				lastName: lName,
				userType: userType,
				departmentName: dptName,
				registerNo: regNo,
				birthDate: dob,
				gender: gender,
				age: age,
			},
		});
		return { result: profile, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating user/profile Location

const createLocation = async (
	addr1,
	addr2,
	city,
	state,
	country,
	pin,
	nationality,
	contact,
	profileId,
	userId
) => {
	try {
		const location = await prisma.location.create({
			data: {
				addressLine1: addr1,
				addressLine2: addr2,
				city,
				state,
				country,
				postalCode: pin,
				nationality,
				contactNo: contact,
				belongsTo: {
					connect: { id: profileId },
				},
				relatedTo: {
					connect: { id: userId },
				},
			},
		});
		return { result: location, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For updating Location info by Location ID

const updateLocationById = async (
	id,
	addr1,
	addr2,
	city,
	state,
	country,
	pin,
	nationality,
	contact
) => {
	try {
		const profile = await prisma.profile.update({
			where: {
				id: id,
			},
			data: {
				addressLine1: addr1,
				addressLine2: addr2,
				city,
				state,
				country,
				postalCode: pin,
				nationality,
				contactNo: contact,
			},
		});
		return { result: profile, error: null };
	} catch (err) {
		return { result: null, error: err.message };
	}
};

//* For creating user/profile Course

const createCourse = async (
	crsName,
	crsDesc,
	sDate,
	eDate,
	tPeriod,
	instName,
	instLocation,
	isRemote,
	profileId,
	userId
) => {
	try {
		const course = await prisma.course.create({
			data: {
				courseName: crsName,
				courseDescrpt: crsDesc,
				startDate: sDate,
				endDate: eDate,
				timePeriod: tPeriod,
				instituteName: instName,
				instituteLocation: instLocation,
				isRemote,
				belongsTo: {
					connect: { id: profileId },
				},
				relatedTo: {
					connect: { id: userId },
				},
			},
		});
	} catch (err) {}
};

//* For updating Course by Course Id

const updateCourseById = async (
	id,
	crsName,
	crsDesc,
	sDate,
	eDate,
	tPeriod,
	instName,
	instLocation,
	isRemote
) => {
	try {
		const course = await prisma.course.update({
			where: {
				id: id,
			},
			data: {
				courseName: crsName,
				courseDescription: crsDesc,
				startDate: sDate,
				endDate: eDate,
				timePeriod: tPeriod,
				instituteName: instName,
				instituteLocation: instLocation,
				isRemote,
			},
		});
	} catch (err) {}
};

//* For deleting course by using Course ID

const deleteCourseById = async (id) => {
	try {
		const course = await prisma.course.deleteMany({
			where: {
				id: id,
			},
		});
	} catch (err) {
		return { result: null, error: err.message };
	}
};
