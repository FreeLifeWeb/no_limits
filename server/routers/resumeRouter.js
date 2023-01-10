const express = require('express');
const { Resume } = require('../db/models');

const resumeRouter = express.Router();

resumeRouter.post('/', async (req, res) => {
  const resume = Resume.findAll();
  res.json(resume);
});

module.exports = resumeRouter;
