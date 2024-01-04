const postModel = require('./../models/homeModel');

// @route 	GET /userId?size&skip
//  @desc   Getting the posts for home page
//  @body

exports.getHomePage = async (req, res) => {
	const { size, skip } = req.query;
	const { userId } = req.params;

	const { result: selectedPost, error: selectErr } =
		await homeModel.selectPostsForHomePage(Number(size), Number(skip), userId);

	if (selectErr) {
		return res.status(500).json({
			status: 'Failure: PostErr',
			message: `Internal Server Error : ${selectErr}`,
		});
	}

	console.log(selectedPost);
	return res.status(200).json({
		status: 'Success',
		message: `Successfully Retrieved the Homepage Post details`,
		data: selectedPost,
	});
};
