/* eslint-disable max-len */
const express = require('express');
const { Resume, Sphere } = require('../db/models');

const candRouter = express.Router();

// const rightCase = (word) => word[0].toUpperCase() + word.slice(1, word.length);
// const toNumber = (str) => ((isNaN(Number(str)) || str === '') ? 0 : Number(str));

const toCutNum = (str) => ((isNaN(Number(str.split(' ').join(''))) || str === '') ? 0 : Number(str.split('').map((x) => ((/\d/.test(x)) ? x : '')).join('').trim()));

candRouter.get('/resume/spheres', async (req, res) => {
  try {
    const sphereList = await Sphere.findAll();
    // console.log(sphereList);
    res.json(sphereList);
  } catch (error) {
    res.sendStatus(500);
  }
});

candRouter.get('/resume/get/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const userResume = (await Resume.findAll({ where: { userId: id } }));
    // console.log(userResume[userResume.length - 1], 'ioioioioioiooioi');
    res.json(Array.isArray(userResume) ? userResume[userResume.length - 1] : userResume);
  } catch (error) {
    res.sendStatus(500);
  }
});

candRouter.post('/resume/:id', async (req, res) => {
  try {
    // console.log(00000);
    // if (!name || !age || !email || !phoneNumber|| !location|| !sphere|| !about|| !salary) return res.status(400).json({ message: 'Все поля должны быть заполнены' });
    const {
      name, age, phoneNumber, location, sphere, about, salary,
    } = req.body;// no email here
    const { id } = req.params;
    // console.log(sphere, 11111);
    const sphereId = (await Sphere.findOne({ where: { title: sphere } })).id;// id
    // console.log(sphereId, 22222, toNumber(age));
    // console.log(name,age, phoneNumber, location, sphere, about, salary,55555);
    await Resume.create({
      name,
      // age: Number(age)||0,
      age: toCutNum(age),
      email: 'someemail@mail.ru',
      phoneNumber: toCutNum(phoneNumber),
      location,
      about,
      photo: '',
      salary: toCutNum(salary),
      sphereId,
      userId: toCutNum(id),
      categoryId: 1,
    });
    console.log(3333, 'DONE');
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = candRouter;
