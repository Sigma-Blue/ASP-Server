const profileModel = require("./../models/profileModel");
const userModel = require("./../models/userModel");

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

//  @route  POST  /createProfileAbout
//  @desc   Adding About of Profile for New User
//  @body   abtDesc,profileId

exports.addProfileAbout = async (req, res) => {
  const { abtDesc, profileId } = req.body;

  const { result: createdAbout, error: createdErr } =
    await profileModel.createProfileAbout(abtDesc, profileId);

  if (createdErr) {
    return res.status(500).json({
      status: "Failure: CreatedErr",
      message: `Internal Server Error : ${createdErr}`,
    });
  }

  console.log(createdAbout);
  return res.status(201).json({
    status: "Success",
    message: `Successfully Saved the About details`,
  });
};

//  @route  GET  /:userId
//  @desc   Getting the profile for a given userID
//  @body

exports.getProfile = async (req, res) => {
  const userId = req.params.userId;
  console.log(userId.slice(1));

  const { result: selectedProfile, error: selectedErr } =
    await profileModel.selectProfileByUserId(userId.slice(1));

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
  console.log(profileId.slice(1));

  const { result: selectedLocation, error: selectedErr } =
    await profileModel.selectLocationByProfileId(profileId.slice(1));

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
