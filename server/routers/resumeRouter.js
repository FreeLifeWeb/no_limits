const express = require('express');
const { Resume } = require('../db/models');

const resumeRouter = express.Router();

resumeRouter.post('/', async (req, res) => {
  try {
    const resume = Resume.findAll();
    res.json(resume);
  } catch {
    console.log('err');
  }
});

module.exports = resumeRouter;
