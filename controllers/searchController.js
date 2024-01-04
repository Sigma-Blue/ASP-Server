const searchModel = require('./../models/searchModel');

//  @route  GET /profile?name
//  @desc   Searching profiles
//  @body

exports.getSelectedProfile = async (req, res) => {
	const { userName } = req.query;

	const { result: searchedProfile, error: profileErr } =
		await searchModel.searchProfileForSearchPage(userName);

	if (profileErr) {
		return res.status(500).json({
			status: 'Failure: PostErr',
			message: `Internal Server Error : ${profileErr}`,
		});
	}

	console.log(searchedProfile);
	return res.status(200).json({
		status: 'Success',
		message: `Successfully Retrieved the Profile details for Search Page`,
		data: searchedProfile,
	});
};
