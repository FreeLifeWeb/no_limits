/* eslint-disable max-len */
const express = require('express');
const { Resume, Sphere } = require('../db/models');

const candRouter = express.Router();

const rightCase = (word) => word[0].toUpperCase() + word.slice(1, word.length);

candRouter.get('/resume/spheres', async (req, res) => {
  try {
    const sphereList = await Sphere.findAll();
    console.log(sphereList);
    res.json(sphereList);
  } catch (error) {
    res.sendStatus(500);
  }
});

candRouter.post('/resume/:id', async (req, res) => {
  try {
    // if (!name || !age || !email || !phoneNumber|| !location|| !sphere|| !about|| !salary) return res.status(400).json({ message: 'Все поля должны быть заполнены' });
    const {
      name, age, email, phoneNumber, location, sphere, about, salary,
    } = req.body;
    const { id } = req.params;
    console.log(rightCase(sphere));
    const sphereId = (await Sphere.findOne({ where: { title: rightCase(sphere) } }));// id
    console.log(sphereId);
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
