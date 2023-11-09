const profileModel = require("./../models/profileModel");

//	@route	POST	/createProfile
//	@desc		Adding Profile for New User
//	@body		fNAme,lName,dptName,regNo,dob,gender,age,userId

exports.addProfile = async (req, res) => {
  const { fName, lName, dptName, regNo, dob, gender, age, userId } = req.body;

  const { result: createdProfile, error: createdErr } =
    await profileModel.createProfile(
      fName,
      lName,
      dptName,
      regNo,
      dob,
      gender,
      age,
      userId
    );

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdProfile);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Profile details : ${userId}`,
  });
};

//	@route	POST	/createLocation
//	@desc		Adding Location Details for New User
//	@body		addr1,addr2,city,state,country,pin,nationality,contact,profileId

exports.addLocation = async (req, res) => {
  const {
    addr1,
    addr2,
    city,
    state,
    country,
    pin,
    nationality,
    contact,
    profileId,
  } = req.body;

  const { result: createdLocation, error: createdErr } =
    await profileModel.createLocation(
      addr1,
      addr2,
      city,
      state,
      country,
      pin,
      nationality,
      contact,
      profileId
    );

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdLocation);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Location details`,
  });
};

//	@route	POST	/createCourse
//	@desc		Adding Course Details for New User
//	@body		crsName,crsDesc,sDate,eDate,tPeriod,instName,instLocation,isRemote,profileId

exports.addCourse = async (req, res) => {
  const {
    crsName,
    crsDesc,
    sDate,
    eDate,
    tPeriod,
    instName,
    instLocation,
    isRemote,
    profileId,
  } = req.body;

  const { result: createdCourse, error: createdErr } =
    await profileModel.createCourse(
      crsName,
      crsDesc,
      sDate,
      eDate,
      tPeriod,
      instName,
      instLocation,
      isRemote,
      profileId
    );

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdCourse);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Course details`,
  });
};

//	@route	POST	/createWork
//	@desc		Adding Work Details for New User
//	@body		wrkDesc,wrkDesc,sDate,eDate,tPeriod,orgName,orgLoc,isRemote,profileId

exports.addWork = async (req, res) => {
  const {
    wrkDesg,
    wrkDesc,
    sDate,
    eDate,
    tPeriod,
    orgName,
    orgLoc,
    isRemote,
    profileId,
  } = req.body;

  const { result: createdWork, error: createdErr } =
    await profileModel.createWork(
      wrkDesg,
      wrkDesc,
      sDate,
      eDate,
      tPeriod,
      orgName,
      orgLoc,
      isRemote,
      profileId
    );

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdWork);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Work details`,
  });
};

//	@route	POST	/createSkill
//	@desc		Adding Skill Details for New User
//	@body		sName,sLink,sRate,sDate,eDate,tPeriod,orgName,orgLoc,isRemote,profileId

exports.addSkill = async (req, res) => {
  const { sName, sLink, sRate, tPeriod, orgName, orgLoc, isRemote, profileId } =
    req.body;

  const { result: createdSkill, error: createdErr } =
    await profileModel.createSkill(
      sName,
      sLink,
      sRate,
      tPeriod,
      orgName,
      orgLoc,
      isRemote,
      profileId
    );

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdSkill);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the Skill details`,
  });
};

//  @route  GET  /:profileId
//  @desc   Getting the profile for a given userID
//  @body

exports.getProfile = async (req, res) => {
  const profileId = req.params.userId;
  console.log(profileId);

  const { result: selectedProfile, error: selectedErr } =
    await profileModel.selectProfileByProfileId(profileId);

  if (selectedErr) {
    return res.status(500).json({
      status: "Failure: SelectedErr",
      message: `Internal Server Error : ${selectedErr}`,
    });
  }

  console.log(selectedProfile);
  return res.status(200).json({
    status: "Success",
    data: {
      profile: selectedProfile,
    },
  });
};

//  @route  GET  /location/:profileId
//  @desc   Getting the location details for a given userID
//  @body

exports.getLocation = async (req, res) => {
  const profileId = req.params.profileId;
  console.log(profileId);

  const { result: selectedLocation, error: selectedErr } =
    await profileModel.selectLocationByProfileId(profileId);

  if (selectedErr) {
    return res.status(500).json({
      status: "Failure: SelectedErr",
      message: `Internal Server Error : ${selectedErr}`,
    });
  }

  console.log(selectedLocation);
  return res.status(200).json({
    status: "Success",
    data: {
      location: selectedLocation,
    },
  });
};

//  @route  GET  /course/:profileId
//  @desc   Getting the course details for a given userID
//  @body

exports.getCourse = async (req, res) => {
  const profileId = req.params.profileId;
  console.log(profileId.slice(1));

  const { result: selectedCourse, error: selectedErr } =
    await profileModel.selectCoursesByProfileId(profileId.slice(1));

  if (selectedErr) {
    return res.status(500).json({
      status: "Failure: SelectedErr",
      message: `Internal Server Error : ${selectedErr}`,
    });
  }

  console.log(selectedCourse);
  return res.status(200).json({
    status: "Success",
    data: {
      course: selectedCourse,
    },
  });
};

//  @route  GET  /work/:profileId
//  @desc   Getting the work details for a given userID
//  @body

exports.getWork = async (req, res) => {
  const profileId = req.params.profileId;
  console.log(profileId);

  const { result: selectedWork, error: selectedErr } =
    await profileModel.selectWorksByProfileId(profileId);

  if (selectedErr) {
    return res.status(500).json({
      status: "Failure: SelectedErr",
      message: `Internal Server Error : ${selectedErr}`,
    });
  }

  console.log(selectedWork);
  return res.status(200).json({
    status: "Success",
    data: {
      work: selectedWork,
    },
  });
};

//  @route  GET  /skill/:profileId
//  @desc   Getting the skill details for a given userID
//  @body

exports.getSkill = async (req, res) => {
  const profileId = req.params.profileId;
  console.log(profileId);

  const { result: selectedSkill, error: selectedErr } =
    await profileModel.selectSkillsByProfileId(profileId);

  if (selectedErr) {
    return res.status(500).json({
      status: "Failure: SelectedErr",
      message: `Internal Server Error : ${selectedErr}`,
    });
  }

  console.log(selectedSkill);
  return res.status(200).json({
    status: "Success",
    data: {
      skill: selectedSkill,
    },
  });
};

//  @route  DELETE  /delete/location
//  @desc   Deleting location of the user
//  @body   courseId, profileId

exports.deleteLocation = async (req, res) => {
  const { locationId, profileId } = req.body;

  const { result: deletedLocation, error: deletedErr } =
    await profileModel.deleteLocationByProfileId(locationId, profileId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedLocation);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Location details`,
  });
};

//  @route  DELETE  /delete/course
//  @desc   Deleting course selected by the user
//  @body   courseId, profileId

exports.deleteCourse = async (req, res) => {
  const { courseId, profileId } = req.body;

  const { result: deletedCourse, error: deletedErr } =
    await profileModel.deleteCourseByProfileId(courseId, profileId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedCourse);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Course details`,
  });
};

//  @route  DELETE  /delete/work
//  @desc   Deleting work selected by the user
//  @body   workId, profileId

exports.deleteWork = async (req, res) => {
  const { workId, profileId } = req.body;

  const { result: deletedWork, error: deletedErr } =
    await profileModel.deleteWorkByProfileId(workId, profileId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedWork);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Work details`,
  });
};

//  @route  DELETE  /delete/skill
//  @desc   Deleting skill selected by the user
//  @body   skillId, profileId

exports.deleteSkill = async (req, res) => {
  const { skillId, profileId } = req.body;

  const { result: deletedSkill, error: deletedErr } =
    await profileModel.deleteSkillByProfileId(skillId, profileId);

  if (deletedErr) {
    return res.status(500).json({
      status: "Failure: DeletedErr",
      message: `Internal Server Error : ${deletedErr}`,
    });
  }

  console.log(deletedSkill);
  return res.status(200).json({
    status: "Success",
    message: `Successfully Deleted the Skill details`,
  });
};
