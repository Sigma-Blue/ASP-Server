const jwt = require('jsonwebtoken');

// TODO: Enter your service functions here

const createJWT = (email) => {
   var token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: 5 * 86400,
      algorithm: process.env.SIGNING_ALGO,
   });

   return token;
};

const verifyJWT = (token) => {
   let decoded;
   try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
   } catch (err) {
      return null;
   }
   return decoded;
};

module.exports = {
   createJWT,
   verifyJWT,
};
