const prisma = require("../prisma/prisma");

//TODO: CREATING:

//* For creating Profile of an user

exports.createProfile = async (
  fName,
  lName,
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
        lastName: lName,
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

//* For creating user/profile Location

exports.createLocation = async (
  addr1,
  addr2,
  city,
  state,
  country,
  pin,
  nationality,
  contact,
  profileId
) => {
  try {
    const location = await prisma.location.create({
      data: {
        city,
        state,
        country,
        nationality,
        contactNo: contact,
        addressLine1: addr1,
        addressLine2: addr2,
        postalCode: pin,
        belongsTo: {
          connect: {
            id: profileId,
          },
        },
      },
    });
    return { result: location, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For creating profile Course

exports.createCourse = async (
  crsName,
  crsDesc,
  sDate,
  eDate,
  tPeriod,
  instName,
  instLocation,
  isRemote,
  profileId
) => {
  try {
    const course = await prisma.course.create({
      data: {
        courseName: crsName,
        courseDescription: crsDesc,
        startDate: sDate,
        endDate: eDate,
        timePeriod: tPeriod,
        instituteName: instName,
        instituteLocation: instLocation,
        isRemote,
        belongsTo: {
          connect: { id: profileId },
        },
      },
    });
    return { result: course, err: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For creating profile Work

exports.createWork = async (
  wrkDesg,
  wrkDesc,
  sDate,
  eDate,
  tPeriod,
  orgName,
  orgLoc,
  isRemote,
  profileId
) => {
  try {
    const work = await prisma.work.create({
      data: {
        workDesignation: wrkDesg,
        workDescription: wrkDesc,
        startDate: sDate,
        endDate: eDate,
        timePeriod: tPeriod,
        organizationName: orgName,
        organizationLocation: orgLoc,
        isRemote,
        belongsTo: {
          connect: { id: profileId },
        },
      },
    });
    return { result: work, err: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For creating profile Skill

exports.createSkill = async (
  sName,
  sLink,
  sRate,
  tPeriod,
  orgName,
  orgLoc,
  isRemote,
  profileId
) => {
  try {
    const skill = await prisma.skill.create({
      data: {
        skillName: sName,
        skillLink: sLink,
        skillRate: sRate,
        timePeriod: tPeriod,
        organizationName: orgName,
        organizationLocation: orgLoc,
        isRemote,
        belongsTo: {
          connect: { id: profileId },
        },
      },
    });
    return { result: skill, err: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//TODO: UPDATING:

//TODO: DELETING:

//* For deleting location by using  profileID

exports.deleteLocationByProfileId = async (locationId, profileId) => {
  try {
    const course = await prisma.location.deleteMany({
      where: {
        id: locationId,
        profileId: profileId,
      },
    });
    return { result: null, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For deleting course by using profileID

exports.deleteCourseByProfileId = async (courseId, profileId) => {
  try {
    const course = await prisma.course.deleteMany({
      where: {
        id: courseId,
        profileId: profileId,
      },
    });
    return { result: null, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For deleting work by using profileID

exports.deleteWorkByProfileId = async (workId, profileId) => {
  try {
    const course = await prisma.work.deleteMany({
      where: {
        id: workId,
        profileId: profileId,
      },
    });
    return { result: null, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For deleting skill by using profileID

exports.deleteSkillByProfileId = async (skillId, profileId) => {
  try {
    const course = await prisma.skill.deleteMany({
      where: {
        id: skillId,
        profileId: profileId,
      },
    });
    return { result: null, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//TODO: READING:

//* For Selecting the unique Profile by UserId

exports.selectProfileByProfileId = async (id) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: {
        Location: true,
        Course: true,
        Work: true,
        Skill: true,
      },
    });
    return { result: profile, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For Selecting the unique Location by ProfileId

exports.selectLocationByProfileId = async (id) => {
  try {
    const location = await prisma.location.findUnique({
      where: {
        profileId: id,
      },
    });
    return { result: location, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For Selecting the set of Courses by ProfileId

exports.selectCoursesByProfileId = async (id) => {
  try {
    const course = await prisma.course.findMany({
      where: {
        profileId: id,
      },
    });
    return { result: course, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For Selecting the set of Works by ProfileId

exports.selectWorksByProfileId = async (id) => {
  try {
    const work = await prisma.work.findMany({
      where: {
        profileId: id,
      },
    });
    return { result: work, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};

//* For Selecting the set of Skills by ProfileId

exports.selectSkillsByProfileId = async (id) => {
  try {
    const skill = await prisma.skill.findMany({
      where: {
        profileId: id,
      },
    });
    return { result: skill, error: null };
  } catch (err) {
    return { result: null, error: err.message };
  }
};
