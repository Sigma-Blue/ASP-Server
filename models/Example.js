const prisma = require('../prisma/prisma');

// TODO: Enter your helper functions here

const getExamples = async (req, res) => {
   try {
      const examples = await prisma.example.findMany();
      res.status(200).json({ examples });
   } catch (error) {
      res.status(500).json({ error });
   }
};

module.exports = {
   getExamples,
};
