const express = require('express');
const { Sphere, Category } = require('../db/models');
const { Vacancy } = require('../db/models');

const apiRouter = express.Router();

apiRouter.post('/sphere', async (req, res) => {
  const sphereList = await Sphere.findAll();
  res.json(sphereList);
});

apiRouter.post('/category', async (req, res) => {
  const categoryList = await Category.findAll();
  res.json(categoryList);
});

apiRouter.post('/vacansy', async (req, res) => {
  const {
    title, company, city, sphere, category, salary, time, format,
  } = req.body;
  const sp = await Sphere.findOne({ where: { title: sphere } });
  const cat = await Category.findOne({ where: { title: category } });
  await Vacancy.create({
    userId: req.session.user.id,
    title,
    company,
    city,
    sphereId: sp.id,
    categoryId: cat.id,
    salary,
    time,
    format,
  });
  const newVac = await Vacancy.findOne({ where: { title }, include: [{ all: true }] });
  res.json(newVac);
});

module.exports = apiRouter;
