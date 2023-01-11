const express = require('express');
const { Resume, Sphere } = require('../db/models');

const candRouter = express.Router();

const toCutNum = (str) => {
  const tested = Number(str.split('').map((x) => ((/\d/.test(x)) ? x : '')).join('').trim());
  return (((isNaN(tested)) || str === '') ? 0 : tested);
};
candRouter.get('/resume/spheres', async (req, res) => {
  try {
    const sphereList = await Sphere.findAll();
    res.json(sphereList);
  } catch (error) {
    res.sendStatus(500);
  }
});

candRouter.get('/resume/get/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const userResume = (await Resume.findAll({ where: { userId: id } }));
    res.json(Array.isArray(userResume) ? userResume[userResume.length - 1] : userResume);
  } catch (error) {
    res.sendStatus(500);
  }
});

candRouter.post('/resume/:id', async (req, res) => {
  try {
    const {
      name, age, phoneNumber, location, sphere, about, salary,
    } = req.body;
    const { id } = req.params;
    const sphereId = (await Sphere.findOne({ where: { title: sphere } })).id;// id
    await Resume.create({
      name,
      age: toCutNum(age),
      email: 'someemail@mail.ru',
      phoneNumber,
      location,
      about,
      photo: '',
      salary: toCutNum(salary),
      sphereId,
      userId: Number(id),
      categoryId: 1,
    });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = candRouter;
