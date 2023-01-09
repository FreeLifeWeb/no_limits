/* eslint-disable max-len */
const express = require('express');
const { Resume } = require('../db/models/resume');
const { Sphere } = require('../db/models/sphere');

const candRouter = express.Router();

candRouter.post('/resume/:id', async (req, res) => {
  try {
    // if (!name || !age || !email || !phoneNumber|| !location|| !sphere|| !about|| !salary) return res.status(400).json({ message: 'Все поля должны быть заполнены' });
    const {
      name, age, email, phoneNumber, location, sphere, about, salary,
    } = req.body;
    const { id } = req.params;
    const sphereId = (await Sphere.findOne({ where: { title: sphere } })).id;
    await Resume.create({
      name,
      age: Number(age),
      email,
      phoneNumber: Number(phoneNumber),
      location,
      about,
      salary: Number(salary),
      sphereId, // не отправляется в бд потому что не нашел сферу
      userId: id,
    });
    console.log(id);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = candRouter;
