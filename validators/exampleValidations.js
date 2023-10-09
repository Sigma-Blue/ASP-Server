const joi = require('joi');

// TODO: Enter your validators here
const validateExample = (req, res, next) => {
   const schema = joi.object({
      example: joi.string().required(),
   });

   const { error } = schema.validate(req.body);

   if (error) {
      return res.status(400).json({ message: error.details[0].message });
   }

   next();
};

module.exports = {
   validateExample,
};
